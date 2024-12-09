import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Navigation = () => {
  const location = useLocation();
  const [isLiking, setIsLiking] = useState(false);
  const [superLikeCount, setSuperLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
        setSuperLikeCount(0);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const handleSuperLike = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSuperLikeCount(1);
      setIsLiking(true);
    } else {
      setSuperLikeCount(2);
      toast("Super Like! 🌟", {
        description: "You've used a Super Like!",
        duration: 2000,
      });
      setTimeout(() => {
        setIsAnimating(false);
        setIsLiking(false);
        setSuperLikeCount(0);
      }, 600);
    }
  };

  const getSuperLikeColor = () => {
    switch (superLikeCount) {
      case 1:
        return "text-blue-500";
      case 2:
        return "text-orange-500";
      default:
        return "text-gray-500";
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
        <button
          className={`p-3 rounded-full transition-all ${getSuperLikeColor()}`}
          onClick={handleSuperLike}
        >
          <Heart 
            className={`w-7 h-7 ${isAnimating ? 'animate-bounce' : ''} ${isLiking ? 'animate-super-like' : ''}`}
            fill={superLikeCount > 0 ? "currentColor" : "none"}
          />
        </button>
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