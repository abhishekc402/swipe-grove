import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    bio: "",
    status: "",
    gender: "",
    interestedIn: "",
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
          <Select onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <Select onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Interested In</label>
          <Select onValueChange={(value) => handleChange("interestedIn", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
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
  );
};

export default Profile;