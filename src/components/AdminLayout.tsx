import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Shield
} from "lucide-react";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUsername, setAdminUsername] = useState<string>("");

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    const username = localStorage.getItem('admin_username');
    
    if (!isAuthenticated || !username) {
      navigate('/admin');
      return;
    }
    
    setAdminUsername(username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_username');
    navigate('/admin');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: Trophy,
    },
    {
      name: 'Participants',
      href: '/admin/participants',
      icon: Users,
    },
    {
      name: 'Results',
      href: '/admin/results',
      icon: BarChart3,
    },
  ];

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Kwara Vendors Award</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-kwara-green/10 text-kwara-green">
                {adminUsername}
              </Badge>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-card min-h-[calc(100vh-73px)]">
          <nav className="p-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Button
                    variant={isCurrentPath(item.href) ? "default" : "ghost"}
                    onClick={() => navigate(item.href)}
                    className={`w-full justify-start ${
                      isCurrentPath(item.href) 
                        ? "bg-gradient-primary text-white" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};