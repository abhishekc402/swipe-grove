import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Navigation = () => {
  const location = useLocation();
  const [isLiking, setIsLiking] = useState(false);
  const [superLikeCount, setSuperLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; color: string }>>([]);
  
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

  const createConfetti = () => {
    const colors = ['#FD3A73', '#FF7854', '#9b87f5', '#7E69AB'];
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleSuperLike = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSuperLikeCount(1);
      setIsLiking(true);
    } else {
      setSuperLikeCount(2);
      createConfetti();
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
    <>
      {confetti.map((c) => (
        <div
          key={c.id}
          className="fixed w-3 h-3 rounded-full animate-confetti"
          style={{ 
            left: c.left, 
            top: "-10px",
            backgroundColor: c.color,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
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
    </>
  );
};