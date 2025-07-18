import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Vote, Check } from "lucide-react";
import { useState } from "react";

interface Participant {
  id: string;
  name: string;
  image?: string;
  votes: number;
}

interface ParticipantCardProps {
  participant: Participant;
  isSelected: boolean;
  onSelect: (participantId: string) => void;
  disabled?: boolean;
}

export const ParticipantCard = ({ 
  participant, 
  isSelected, 
  onSelect, 
  disabled = false 
}: ParticipantCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 overflow-hidden ${
        isSelected 
          ? 'ring-2 ring-kwara-green shadow-glow bg-kwara-green/5' 
          : 'hover:shadow-elegant hover:scale-105'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onSelect(participant.id)}
    >
      <div className="aspect-square relative overflow-hidden">
        {participant.image && !imageError ? (
          <img 
            src={participant.image} 
            alt={participant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
            <User className="h-16 w-16 text-white" />
          </div>
        )}
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute inset-0 bg-kwara-green/20 flex items-center justify-center">
            <div className="w-16 h-16 bg-kwara-green rounded-full flex items-center justify-center shadow-lg">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Voting Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-kwara-green border border-kwara-green/20">
            <Vote className="h-3 w-3 mr-1" />
            {participant.votes}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className={`font-semibold text-lg mb-2 ${
            isSelected ? 'text-kwara-green' : 'text-foreground'
          }`}>
            {participant.name}
          </h3>
          
          <Button 
            variant={isSelected ? "vote" : "outline"}
            size="sm"
            className="w-full"
            disabled={disabled}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Selected
              </>
            ) : (
              <>
                <Vote className="h-4 w-4 mr-2" />
                Select
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};