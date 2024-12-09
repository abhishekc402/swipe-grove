import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Get matches from localStorage (this would normally come from an API)
  const matchedIds = JSON.parse(localStorage.getItem("matches") || "[]");
  const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
  
  const matchedProfiles = profiles.filter((profile: any) => 
    matchedIds.includes(profile.id)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: "currentUser",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  if (matchedProfiles.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center p-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No matches yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
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
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Matches</h1>
        <div className="space-y-4">
          {matchedProfiles.map((profile: any) => (
            <Card key={profile.id} className="overflow-hidden dark:bg-gray-800/50 dark:border-gray-700">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold dark:text-white">
                      {profile.name}, {profile.age}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{profile.location}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-2"
                    onClick={() => {
                      setSelectedMatch(profile);
                      setChatOpen(true);
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

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMatch && (
                <>
                  <img
                    src={selectedMatch.image}
                    alt={selectedMatch.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{selectedMatch.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "currentUser" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.senderId === "currentUser"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
                />
                <Button type="submit" size="icon" className="rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Navigation />
    </div>
  );
};

export default Matches;