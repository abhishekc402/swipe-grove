import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Matches = () => {
  // Get matches from localStorage (this would normally come from an API)
  const matchedIds = JSON.parse(localStorage.getItem("matches") || "[]");
  const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
  
  const matchedProfiles = profiles.filter((profile: any) => 
    matchedIds.includes(profile.id)
  );

  if (matchedProfiles.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No matches yet
            </h2>
            <p className="text-gray-500">
              Keep swiping to find your perfect match!
            </p>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
        <div className="space-y-4">
          {matchedProfiles.map((profile: any) => (
            <Card key={profile.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">
                      {profile.name}, {profile.age}
                    </h3>
                    <p className="text-sm text-gray-500">{profile.location}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-2"
                    onClick={() => {
                      // TODO: Implement chat functionality
                      console.log("Chat with:", profile.name);
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Matches;