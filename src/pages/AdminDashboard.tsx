import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Vote, BarChart3, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalCategories: number;
  activeCategories: number;
  totalParticipants: number;
  totalVotes: number;
  batchACategories: number;
  batchBCategories: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCategories: 0,
    activeCategories: 0,
    totalParticipants: 0,
    totalVotes: 0,
    batchACategories: 0,
    batchBCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch categories stats
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('batch, is_active');

      if (categoriesError) throw categoriesError;

      // Fetch participants count
      const { count: participantsCount, error: participantsError } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true });

      if (participantsError) throw participantsError;

      // Fetch total votes
      const { count: votesCount, error: votesError } = await supabase
        .from('vote_logs')
        .select('*', { count: 'exact', head: true });

      if (votesError) throw votesError;

      // Calculate stats
      const totalCategories = categories?.length || 0;
      const activeCategories = categories?.filter(c => c.is_active).length || 0;
      const batchACategories = categories?.filter(c => c.batch === 'A').length || 0;
      const batchBCategories = categories?.filter(c => c.batch === 'B').length || 0;

      setStats({
        totalCategories,
        activeCategories,
        totalParticipants: participantsCount || 0,
        totalVotes: votesCount || 0,
        batchACategories,
        batchBCategories,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Categories",
      value: stats.totalCategories,
      icon: Trophy,
      color: "text-kwara-green",
      bgColor: "bg-kwara-green/10",
    },
    {
      title: "Active Categories",
      value: stats.activeCategories,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Participants",
      value: stats.totalParticipants,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Votes Cast",
      value: stats.totalVotes,
      icon: Vote,
      color: "text-kwara-gold",
      bgColor: "bg-kwara-gold/10",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of the Kwara Vendors Award</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of the Kwara Vendors Award voting system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="hover:shadow-card transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Batch Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Batch Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-primary text-white">Batch A</Badge>
                  <span className="text-sm text-muted-foreground">Week 1</span>
                </div>
                <span className="font-semibold">{stats.batchACategories} categories</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-gold text-white">Batch B</Badge>
                  <span className="text-sm text-muted-foreground">Week 2</span>
                </div>
                <span className="font-semibold">{stats.batchBCategories} categories</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>• Manage categories and participants</p>
                <p>• View real-time voting results</p>
                <p>• Monitor voting activity</p>
                <p>• Export data for analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Note */}
      <Card className="bg-gradient-primary text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Vote className="h-8 w-8" />
            <div>
              <h3 className="text-lg font-semibold">Voting System Active</h3>
              <p className="text-white/90">
                The voting system is running smoothly. Use the navigation menu to manage categories, 
                participants, and view detailed results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}