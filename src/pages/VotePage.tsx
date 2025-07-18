import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParticipantCard } from "@/components/ParticipantCard";
import { Header } from "@/components/Header";
import { ArrowLeft, Vote, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  batch: string;
  image?: string;
  is_active: boolean;
}

interface Participant {
  id: string;
  name: string;
  image?: string;
  votes: number;
}

interface VoteResult {
  success: boolean;
  message: string;
  remaining_votes: number;
}

export default function VotePage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [remainingVotes, setRemainingVotes] = useState<number | null>(null);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryAndParticipants();
      checkRemainingVotes();
    }
  }, [categoryId]);

  const fetchCategoryAndParticipants = async () => {
    try {
      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();

      if (categoryError) throw categoryError;
      
      if (!categoryData.is_active) {
        toast({
          title: "Category Not Available",
          description: "This category is not currently accepting votes.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setCategory(categoryData);

      // Fetch participants
      const { data: participantsData, error: participantsError } = await supabase
        .from('participants')
        .select('*')
        .eq('category_id', categoryId)
        .order('name');

      if (participantsError) throw participantsError;
      setParticipants(participantsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load voting data. Please try again.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const checkRemainingVotes = async () => {
    try {
      // Get user's IP address (in a real app, this would be handled by the backend)
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { data, error } = await supabase.rpc('check_vote_limit', {
        p_ip_address: ip,
        p_category_id: categoryId
      });

      if (error) throw error;
      setRemainingVotes(5 - (data || 0));
    } catch (error) {
      console.error('Error checking vote limit:', error);
      setRemainingVotes(5); // Default to 5 if we can't check
    }
  };

  const handleVote = async () => {
    if (!selectedParticipant || !categoryId) return;

    setVoting(true);
    try {
      // Get user's IP address
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();

      const { data, error } = await supabase.rpc('cast_vote', {
        p_ip_address: ip,
        p_category_id: categoryId,
        p_participant_id: selectedParticipant
      });

      if (error) throw error;

      const result = data as unknown as VoteResult;
      
      if (result.success) {
        toast({
          title: "Vote Cast Successfully!",
          description: `${result.message} You have ${result.remaining_votes} votes left for this category today.`,
        });
        setRemainingVotes(result.remaining_votes);
        setSelectedParticipant(null);
        // Refresh participants to update vote counts
        fetchCategoryAndParticipants();
      } else {
        toast({
          title: "Vote Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error casting vote:', error);
      toast({
        title: "Error",
        description: "Failed to cast vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>

        {/* Category Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-gradient-primary text-white px-4 py-2">
              Batch {category.batch}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {category.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{participants.length} Participants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Vote className="h-4 w-4" />
              <span>{remainingVotes ?? '...'} Votes Left Today</span>
            </div>
          </div>
        </div>

        {/* Voting Info Card */}
        <Card className="mb-8 bg-gradient-primary text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Voting Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Select one participant below</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Maximum 5 votes per day</span>
              </div>
              <div className="flex items-center space-x-2">
                <Vote className="h-4 w-4" />
                <span>Votes are tracked by IP address</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants Grid */}
        {participants.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  isSelected={selectedParticipant === participant.id}
                  onSelect={setSelectedParticipant}
                  disabled={voting || (remainingVotes !== null && remainingVotes <= 0)}
                />
              ))}
            </div>

            {/* Vote Button */}
            <div className="text-center">
              <Button
                variant="vote"
                size="xl"
                onClick={handleVote}
                disabled={!selectedParticipant || voting || (remainingVotes !== null && remainingVotes <= 0)}
                className="px-12"
              >
                {voting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Casting Vote...
                  </>
                ) : (
                  <>
                    <Vote className="h-5 w-5 mr-2" />
                    Cast Your Vote
                  </>
                )}
              </Button>
              
              {remainingVotes !== null && remainingVotes <= 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  You have used all 5 votes for this category today. Come back tomorrow!
                </p>
              )}
            </div>
          </>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Participants Yet</h3>
              <p className="text-muted-foreground">Participants for this category will be added soon.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}