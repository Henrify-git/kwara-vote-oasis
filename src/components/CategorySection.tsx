import { useState, useEffect } from "react";
import { CategoryCard } from "./CategoryCard";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  batch: string;
  image?: string;
  is_active: boolean;
}

export const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('batch', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const batchACategories = categories.filter(cat => cat.batch === 'A');
  const batchBCategories = categories.filter(cat => cat.batch === 'B');

  if (loading) {
    return (
      <section id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vote for Your Favorite Vendors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated categories and support the vendors who make our community special.
          </p>
        </div>

        {/* Batch A */}
        {batchACategories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Badge className="bg-gradient-primary text-white px-6 py-2 text-lg">
                <Calendar className="h-5 w-5 mr-2" />
                Batch A - Week 1
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {batchACategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Batch B */}
        {batchBCategories.length > 0 && (
          <div>
            <div className="flex items-center justify-center mb-8">
              <Badge className="bg-gradient-gold text-white px-6 py-2 text-lg">
                <Award className="h-5 w-5 mr-2" />
                Batch B - Week 2
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {batchBCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {categories.length === 0 && (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Categories Available</h3>
            <p className="text-muted-foreground">Categories will be available when voting begins.</p>
          </div>
        )}
      </div>
    </section>
  );
};