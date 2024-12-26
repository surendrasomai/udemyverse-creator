import { Search, ShoppingCart, User, BookOpen, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Navbar = () => {
  const { user } = useAuth();
  const { role, isEducator, isAdmin, isSuperAdmin } = useRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error:", error);
    }
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-udemy-primary">
            Learnify
          </Link>
          
          <div className="hidden flex-1 mx-8 lg:block">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full max-w-xl pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {user ? (
              <div className="flex gap-2">
                {isEducator && (
                  <Button variant="outline" onClick={() => navigate("/educator/dashboard")}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Educator Dashboard
                  </Button>
                )}
                {(isAdmin || isSuperAdmin) && (
                  <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                )}
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>Log in</Button>
                <Button 
                  className="bg-udemy-secondary hover:bg-udemy-secondary/90"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};