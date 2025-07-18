import { Button } from "@/components/ui/button";
import { Award, Users, Vote } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    categoriesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Kwara Vendors Award" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kwara-green/90 via-kwara-green/70 to-kwara-gold/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Kwara Vendors
              <span className="block bg-gradient-to-r from-kwara-gold to-kwara-gold-light bg-clip-text text-transparent">
                Award 2024
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Celebrating excellence in our marketplace. Vote for the best vendors who serve our community with dedication and quality.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>45 Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>2 Batches</span>
            </div>
            <div className="flex items-center space-x-2">
              <Vote className="h-5 w-5" />
              <span>5 Votes per Category</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gold" 
              size="xl" 
              onClick={scrollToCategories}
              className="transform hover:scale-105 transition-transform"
            >
              <Vote className="h-5 w-5" />
              Start Voting
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-kwara-green backdrop-blur-sm"
            >
              <Award className="h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-kwara-gold/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-kwara-gold/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};