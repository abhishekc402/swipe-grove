import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    bio: "",
    status: "single",
    gender: "other",
    interestedIn: "both",
    location: "",
    interests: "",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    toast.success("Profile updated successfully!");
  };

  return (
    <>
      <div className="container max-w-2xl mx-auto p-6 pb-24">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Age</label>
            <Input
              type="number"
              value={profile.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Your age"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship Status</label>
            <select
              value={profile.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interested In</label>
            <select
              value={profile.interestedIn}
              onChange={(e) => handleChange("interestedIn", e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              value={profile.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Where do you live?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interests</label>
            <Textarea
              value={profile.interests}
              onChange={(e) => handleChange("interests", e.target.value)}
              placeholder="What do you like to do?"
            />
          </div>

          <Button type="submit" className="w-full button-primary">
            Save Profile
          </Button>
        </form>
      </div>
      <Navigation />
    </>
  );
};

export default Profile;