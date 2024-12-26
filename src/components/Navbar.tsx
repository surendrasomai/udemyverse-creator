import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
            
            <div className="flex gap-2">
              <Button variant="outline">Log in</Button>
              <Button className="bg-udemy-secondary hover:bg-udemy-secondary/90">Sign up</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};