import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, X } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
  bio: string;
  location?: string;
  interests?: string;
  status?: string;
}

interface Props {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard = ({ profile, onSwipe }: Props) => {
  const [exitX, setExitX] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 200 : -200);
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <>
      <motion.div
        className="profile-card"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: exitX }}
        style={{ x, rotate, opacity }}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          
          {/* Like/Nope Stamps */}
          <motion.div
            className="absolute top-8 right-8 rotate-12 border-4 border-green-500 rounded-xl px-4 py-2"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-green-500 font-bold text-4xl">LIKE</span>
          </motion.div>
          
          <motion.div
            className="absolute top-8 left-8 -rotate-12 border-4 border-red-500 rounded-xl px-4 py-2"
            style={{ opacity: nopeOpacity }}
          >
            <span className="text-red-500 font-bold text-4xl">NOPE</span>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {profile.name}, {profile.age}
            </h2>
            {profile.location && (
              <p className="text-lg opacity-90 mb-2">
                📍 {profile.location}
              </p>
            )}
            <p className="text-base opacity-80 line-clamp-2">{profile.bio}</p>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button 
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                onSwipe("left");
              }}
            >
              <X className="w-8 h-8 text-red-500" />
            </button>
            <button 
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                onSwipe("right");
              }}
            >
              <Heart className="w-8 h-8 text-green-500" />
            </button>
          </div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
          <div className="space-y-4">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold dark:text-white">
                {profile.name}, {profile.age}
              </h2>
              {profile.location && (
                <p className="text-gray-600 dark:text-gray-300">📍 {profile.location}</p>
              )}
            </div>
            {profile.bio && <p className="text-sm dark:text-gray-300">{profile.bio}</p>}
            {profile.interests && (
              <div>
                <h3 className="font-medium dark:text-white mb-1">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.split(", ").map((interest, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm dark:text-gray-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};