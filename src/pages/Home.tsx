import { useState } from "react";
import { SwipeCard } from "../components/SwipeCard";
import { Navigation } from "../components/Navigation";

const DUMMY_PROFILES = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    bio: "Adventure seeker & coffee lover",
  },
  {
    id: "2",
    name: "James",
    age: 32,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    bio: "Photographer & world traveler",
  },
  // Add more profiles as needed
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-8 px-4">
        <div className="card-stack">
          {currentIndex < DUMMY_PROFILES.length && (
            <SwipeCard
              key={DUMMY_PROFILES[currentIndex].id}
              profile={DUMMY_PROFILES[currentIndex]}
              onSwipe={handleSwipe}
            />
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Home;