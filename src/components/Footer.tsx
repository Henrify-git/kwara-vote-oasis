import { Trophy, Heart, Shield, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-kwara-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-kwara-gold rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Kwara Vendors Award</h3>
                <p className="text-sm text-white/80">Excellence in Marketplace</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Celebrating the hardworking vendors who make our community vibrant and prosperous.
            </p>
          </div>

          {/* Voting Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Voting Guidelines</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Maximum 5 votes per category per day</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Vote based on IP address tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Fair and transparent voting process</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About the Award</h4>
            <p className="text-sm text-white/70">
              The Kwara Vendors Award recognizes outstanding vendors across various categories, 
              promoting excellence and innovation in our marketplace ecosystem.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="h-4 w-4 text-kwara-gold" />
              <span className="text-white/70">Made with love for our community</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/60">
            © 2024 Kwara Vendors Award. All rights reserved. | Promoting marketplace excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};