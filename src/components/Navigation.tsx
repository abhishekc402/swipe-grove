import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Navigation = () => {
  const location = useLocation();
  const [isLiking, setIsLiking] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLiking) {
      timer = setTimeout(() => {
        setIsLiking(false);
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [isLiking]);

  const handleSuperLike = () => {
    if (!hasAnimated) {
      setIsLiking(true);
      setHasAnimated(true);
      toast.custom((t) => (
        <div className="bg-gradient-to-r from-primary to-accent-secondary p-4 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
          <div className="animate-bounce text-white text-xl font-bold text-center">
            ✨ Super Like! ✨
          </div>
        </div>
      ), {
        duration: 2000,
        position: 'top-center',
      });
    } else {
      setIsLiking(true);
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
          className={`p-3 rounded-full transition-all ${
            isLiking ? "text-primary" : "text-gray-500"
          }`}
          onClick={handleSuperLike}
        >
          <Heart 
            className={`w-7 h-7 ${isLiking ? 'animate-super-like' : ''}`}
            fill={isLiking ? "currentColor" : "none"}
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