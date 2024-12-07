import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
  bio: string;
}

interface Props {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard = ({ profile, onSwipe }: Props) => {
  const [exitX, setExitX] = useState<number>(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 200 : -200);
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      className="profile-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      style={{ x, rotate, opacity }}
    >
      <div className="relative h-full">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h2 className="text-2xl font-bold mb-1">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-sm opacity-90">{profile.bio}</p>
        </div>
        <div className="swipe-overlay-left" style={{ opacity: x.get() < 0 ? Math.abs(x.get()) / 100 : 0 }} />
        <div className="swipe-overlay-right" style={{ opacity: x.get() > 0 ? x.get() / 100 : 0 }} />
      </div>
    </motion.div>
  );
};