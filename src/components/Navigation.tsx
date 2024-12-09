import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User, Home } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Navigation = () => {
  const location = useLocation();
  const [isLiking, setIsLiking] = useState(false);
  const [superLikeCount, setSuperLikeCount] = useState(0);
  
  const isActive = (path: string) => location.pathname === path;

  const handleSuperLike = () => {
    setIsLiking(true);
    setSuperLikeCount((prev) => {
      const newCount = (prev + 1) % 3;
      if (newCount === 2) {
        toast("Super Like! 🌟", {
          description: "You've used a Super Like!",
          duration: 2000,
        });
      }
      return newCount;
    });
    setTimeout(() => setIsLiking(false), 600);
  };

  const getSuperLikeColor = () => {
    switch (superLikeCount) {
      case 0:
        return "text-blue-500";
      case 1:
        return "text-gradient-to-r from-blue-500 to-primary";
      case 2:
        return "text-primary";
      default:
        return "text-blue-500";
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link
          to="/home"
          className={`p-3 rounded-full transition-all ${
            isActive("/home") ? "text-primary scale-110" : "text-gray-500"
          }`}
        >
          <Home 
            className="w-7 h-7"
            fill={isActive("/home") ? "currentColor" : "none"}
          />
        </Link>
        <Link
          to="/home"
          className={`p-3 rounded-full transition-all ${getSuperLikeColor()}`}
        >
          <Heart 
            className={`w-7 h-7 ${isLiking ? 'animate-super-like' : ''}`}
            onClick={handleSuperLike}
            fill={superLikeCount > 0 ? "currentColor" : "none"}
          />
        </Link>
        <Link
          to="/matches"
          className={`p-3 rounded-full transition-all ${
            isActive("/matches") ? "text-primary scale-110" : "text-gray-500"
          }`}
        >
          <MessageCircle 
            className="w-7 h-7"
            fill={isActive("/matches") ? "currentColor" : "none"}
          />
        </Link>
        <Link
          to="/profile"
          className={`p-3 rounded-full transition-all ${
            isActive("/profile") ? "text-primary scale-110" : "text-gray-500"
          }`}
        >
          <User 
            className="w-7 h-7"
            fill={isActive("/profile") ? "currentColor" : "none"}
          />
        </Link>
      </div>
    </nav>
  );
};