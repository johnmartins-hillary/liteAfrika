import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";

interface VoteCommunity {
  id: string;
  name: string;
  description: string;
  image: string;
  votes: number;
  hasVoted: boolean;
}

export function VoteCommunityPage() {
  const [communities, setCommunities] = useState<VoteCommunity[]>([
    {
      id: "1",
      name: "Kiribati Village, Nigeria",
      description:
        "A rural community working to bring solar energy to every household for sustainable development.",
      image:
        "https://images.unsplash.com/photo-1636871694216-d04517e0d1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGFnZSUyMGxhbmRzY2FwZSUyMHN1bnNldHxlbnwxfHx8fDE3NTUwNzU5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      votes: 1240,
      hasVoted: false,
    },
    {
      id: "2",
      name: "Achimota Valley, Ghana",
      description:
        "Mountain community seeking solar infrastructure to power schools and healthcare facilities.",
      image:
        "https://images.unsplash.com/photo-1445407167204-99163ec1ccb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcnVyYWwlMjBjb21tdW5pdHklMjBncmVlbiUyMGhpbGxzfGVufDF8fHx8MTc1NTA3NTk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      votes: 987,
      hasVoted: false,
    },
    {
      id: "3",
      name: "Nikata Village, Nigeria",
      description:
        "Coastal community working to establish renewable energy systems for local businesses.",
      image:
        "https://images.unsplash.com/photo-1542936586-2620482f0690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdG93biUyMHN1bnNldCUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzU1MDc1OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      votes: 756,
      hasVoted: false,
    },
  ]);

  const handleVote = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? { ...community, votes: community.votes + 1, hasVoted: true }
          : community
      )
    );

    const community = communities.find((c) => c.id === communityId);
    toast.success(`Thank you for voting for ${community?.name}!`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">Vote for a Community</h1>
          <p className="text-gray-600">
            Help decide which communities should receive funding next by casting
            your vote!
          </p>
        </div>

        <div className="space-y-4">
          {communities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Community Image */}
                  <div className="md:w-80 h-48 md:h-auto">
                    <ImageWithFallback
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Community Info */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between h-full">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-lg font-medium mb-2">
                          {community.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {community.description}
                        </p>
                        <div className="text-sm text-gray-500">
                          {community.votes.toLocaleString()} votes
                        </div>
                      </div>

                      {/* Vote Button */}
                      <div className="md:ml-6">
                        <Button
                          onClick={() => handleVote(community.id)}
                          disabled={community.hasVoted}
                          className={`px-8 py-2 rounded-md font-medium transition-colors ${
                            community.hasVoted
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-[#FFC404] hover:bg-yellow-500 text-black"
                          }`}
                        >
                          {community.hasVoted ? "Voted" : "Vote"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
