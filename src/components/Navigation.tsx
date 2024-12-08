import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link
          to="/home"
          className={`p-2 rounded-full transition-colors ${
            isActive("/home") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Heart className="w-6 h-6" />
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