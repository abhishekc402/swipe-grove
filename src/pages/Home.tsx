import { useState } from "react";
import { SwipeCard } from "../components/SwipeCard";
import { Navigation } from "../components/Navigation";
import { toast } from "sonner";

const DUMMY_PROFILES = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    bio: "Adventure seeker & coffee lover",
    location: "New York City",
    interests: "Hiking, Photography, Travel",
    status: "Single"
  },
  {
    id: "2",
    name: "James",
    age: 32,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    bio: "Photographer & world traveler",
    location: "Los Angeles",
    interests: "Photography, Music, Surfing",
    status: "Single"
  },
  {
    id: "3",
    name: "Emma",
    age: 26,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    bio: "Tech enthusiast and foodie",
    location: "San Francisco",
    interests: "Technology, Cooking, Gaming",
    status: "Single"
  },
  {
    id: "4",
    name: "Michael",
    age: 30,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    bio: "Software engineer by day, musician by night",
    location: "Seattle",
    interests: "Music, Coding, Fitness",
    status: "Single"
  },
  {
    id: "5",
    name: "Sophia",
    age: 27,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    bio: "Art lover and yoga enthusiast",
    location: "Chicago",
    interests: "Art, Yoga, Reading",
    status: "Single"
  },
  {
    id: "6",
    name: "David",
    age: 31,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    bio: "Startup founder and coffee addict",
    location: "Boston",
    interests: "Business, Coffee, Running",
    status: "Single"
  },
  {
    id: "7",
    name: "Olivia",
    age: 25,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    bio: "Fashion designer and travel blogger",
    location: "Miami",
    interests: "Fashion, Travel, Photography",
    status: "Single"
  },
  {
    id: "8",
    name: "Daniel",
    age: 29,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    bio: "AI researcher and sci-fi fan",
    location: "Austin",
    interests: "AI, Reading, Movies",
    status: "Single"
  },
  {
    id: "9",
    name: "Isabella",
    age: 28,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    bio: "Environmental scientist and nature lover",
    location: "Portland",
    interests: "Environment, Hiking, Photography",
    status: "Single"
  },
  {
    id: "10",
    name: "William",
    age: 33,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    bio: "Chef and wine enthusiast",
    location: "San Diego",
    interests: "Cooking, Wine, Travel",
    status: "Single"
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      if (Math.random() < 0.3) {
        setMatches(prev => [...prev, DUMMY_PROFILES[currentIndex].id]);
        toast.success(`It's a match with ${DUMMY_PROFILES[currentIndex].name}! 💖`, {
          duration: 3000,
          className: "bg-gradient-to-r from-primary to-accent-secondary text-white",
        });
      }
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary text-center">Tinder Clone</h1>
        </div>
      </div>

      <div className="pt-20 pb-24 px-4">
        {matches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Matches</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {matches.map(matchId => {
                const profile = DUMMY_PROFILES.find(p => p.id === matchId);
                return profile ? (
                  <div key={profile.id} className="flex-shrink-0">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    />
                    <p className="text-sm text-center mt-1 dark:text-white">{profile.name}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {currentIndex < DUMMY_PROFILES.length ? (
          <div className="card-stack">
            <SwipeCard
              key={DUMMY_PROFILES[currentIndex].id}
              profile={DUMMY_PROFILES[currentIndex]}
              onSwipe={handleSwipe}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
              No more profiles to show
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Check back later for more matches
            </p>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Home;