import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  batch: string;
  image?: string;
  is_active: boolean;
}

interface CategoryCardProps {
  category: Category;
  participantsCount?: number;
}

export const CategoryCard = ({ category, participantsCount = 0 }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleVoteClick = () => {
    if (category.is_active) {
      navigate(`/vote/${category.id}`);
    }
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-white">
      <div className="aspect-[4/3] relative overflow-hidden">
        {category.image ? (
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
            <Users className="h-12 w-12 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3">
          <Badge variant={category.batch === 'A' ? 'default' : 'secondary'} className="bg-kwara-gold text-white">
            Batch {category.batch}
          </Badge>
        </div>
        {!category.is_active && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              Coming Soon
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-kwara-green transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{participantsCount} participants</span>
            </p>
          </div>
          
          <Button 
            variant={category.is_active ? "vote" : "secondary"}
            size="lg" 
            className="w-full"
            onClick={handleVoteClick}
            disabled={!category.is_active}
          >
            {category.is_active ? "Vote Now" : "Coming Soon"}
            {category.is_active && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};