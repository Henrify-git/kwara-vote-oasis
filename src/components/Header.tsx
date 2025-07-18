import { Trophy, Vote } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Kwara Vendors Award</h1>
              <p className="text-sm text-muted-foreground">Excellence in Marketplace</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-kwara-green">
            <Vote className="h-5 w-5" />
            <span className="font-medium">Vote Now</span>
          </div>
        </div>
      </div>
    </header>
  );
};