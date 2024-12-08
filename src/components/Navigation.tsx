import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Navigation = () => {
  const location = useLocation();
  const [isSuper, setIsSuper] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const handleSuperLike = () => {
    setIsSuper(true);
    toast("SUPER LIKE! 🌟", {
      description: "You've used a Super Like!",
      duration: 2000,
    });
    setTimeout(() => setIsSuper(false), 1000);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-50 px-6 py-4">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link
          to="/home"
          className={`p-2 rounded-full transition-colors ${
            isActive("/home") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Heart 
            className={`w-6 h-6 transition-all duration-300 ${
              isSuper ? 'scale-150 text-[#FF3B5C] animate-pulse' : ''
            }`}
            onClick={handleSuperLike}
            fill={isSuper ? "#FF3B5C" : isActive("/home") ? "currentColor" : "none"}
          />
        </Link>
        <Link
          to="/matches"
          className={`p-2 rounded-full transition-colors ${
            isActive("/matches") ? "text-primary" : "text-gray-500"
          }`}
        >
          <MessageCircle className="w-6 h-6" />
        </Link>
        <Link
          to="/profile"
          className={`p-2 rounded-full transition-colors ${
            isActive("/profile") ? "text-primary" : "text-gray-500"
          }`}
        >
          <User className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};