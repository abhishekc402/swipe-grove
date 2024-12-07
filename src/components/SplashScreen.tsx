import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SplashScreen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => navigate("/home"), 400);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-400 
                 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div className="text-center animate-scale-up">
        <h1 className="text-4xl font-bold text-primary mb-4">DateMe</h1>
        <p className="text-gray-600">Find your perfect match</p>
      </div>
    </div>
  );
};