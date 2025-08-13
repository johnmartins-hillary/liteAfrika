import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CommunityDetailPage } from "./CommunityDetailPage";

interface Community {
  id: string;
  name: string;
  image: string;
  fundingGoal: number;
  currentFunding: number;
  status: "Active" | "Funded" | "Pending";
  location: string;
  population: number;
  established: string;
  description: string;
}

export function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: "1",
      name: "Kumasi",
      image:
        "https://images.unsplash.com/photo-1659538024776-16955b45180b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGFnZSUyMHN1bnNldCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTUwNzU0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      fundingGoal: 10000,
      currentFunding: 8500,
      status: "Active",
      location: "Kumasi, Ghana",
      population: 2500,
      established: "1998",
      description:
        "Kumasi is a vibrant community working to bring sustainable solar energy to every household. With a strong agricultural base and growing population, this community is committed to environmental sustainability and improving quality of life through renewable energy solutions.",
    },
    {
      id: "2",
      name: "Rurimuri",
      image:
        "https://images.unsplash.com/photo-1509957094056-2d82f71ea20a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcnVyYWwlMjB0b3duJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NTUwNzU0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      fundingGoal: 10000,
      currentFunding: 6200,
      status: "Active",
      location: "Rurimuri, Kenya",
      population: 1800,
      established: "2003",
      description:
        "Located in the beautiful highlands of Kenya, Rurimuri community is seeking solar infrastructure to power their schools and healthcare facilities. This mountainous region has abundant sunlight that can be harnessed to improve education and healthcare services.",
    },
    {
      id: "3",
      name: "Akro",
      image:
        "https://images.unsplash.com/photo-1686769094976-2b48b8a59e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdmlsbGFnZSUyMGhvdXNlcyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1NTA3NTQ0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      fundingGoal: 10000,
      currentFunding: 4800,
      status: "Active",
      location: "Akro, Nigeria",
      population: 3200,
      established: "1985",
      description:
        "Akro is a traditional community with rich cultural heritage. They are working to establish renewable energy systems that will support local businesses and improve economic opportunities while preserving their traditional way of life.",
    },
    {
      id: "4",
      name: "Nsanka",
      image:
        "https://images.unsplash.com/photo-1723908021871-f76201c6db1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdG93biUyMGNvbW11bml0eSUyMGJ1aWxkaW5nc3xlbnwxfHx8fDE3NTUwNzU0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      fundingGoal: 10000,
      currentFunding: 7300,
      status: "Active",
      location: "Nsanka, Tanzania",
      population: 2100,
      established: "1992",
      description:
        "Nsanka community is focused on creating a sustainable energy network that will power their growing tech education programs and support young entrepreneurs in the region.",
    },
    {
      id: "5",
      name: "Akoakosua",
      image:
        "https://images.unsplash.com/photo-1566853166891-3936c0191f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcnVyYWwlMjBzZXR0bGVtZW50JTIwaG91c2VzfGVufDF8fHx8MTc1NTA3NTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      fundingGoal: 10000,
      currentFunding: 9100,
      status: "Active",
      location: "Akoakosua, Ghana",
      population: 1500,
      established: "2001",
      description:
        "A coastal community working to establish renewable energy systems that will support their fishing industry and local markets, helping to preserve their marine ecosystem.",
    },
    {
      id: "6",
      name: "Owusufi",
      image:
        "https://images.unsplash.com/photo-1551357275-bbcd128e1515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc21hbGwlMjB0b3duJTIwY29tbXVuaXR5JTIwdmlld3hlbnwxfHx8fDE3NTUwNzU0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      fundingGoal: 10000,
      currentFunding: 5500,
      status: "Active",
      location: "Owusufi, Burkina Faso",
      population: 2800,
      established: "1988",
      description:
        "Owusufi is an agricultural community seeking solar energy solutions to power irrigation systems and food processing facilities, improving food security in the region.",
    },
  ]);

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );

  const handleFund = (communityId: string, amount?: number) => {
    if (amount) {
      // Handle funding from detail page
      setCommunities((prev) =>
        prev.map((community) =>
          community.id === communityId
            ? {
                ...community,
                currentFunding: community.currentFunding + amount,
              }
            : community
        )
      );
      setSelectedCommunity(null);
    } else {
      // Show detail page
      const community = communities.find((c) => c.id === communityId);
      if (community) {
        setSelectedCommunity(community);
      }
    }
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.round((current / goal) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Show community detail if one is selected
  if (selectedCommunity) {
    return (
      <CommunityDetailPage
        community={selectedCommunity}
        onBack={() => setSelectedCommunity(null)}
        onFund={(amount) => handleFund(selectedCommunity.id, amount)}
      />
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">Fund a Community</h1>
          <p className="text-gray-600">
            Support African communities in their journey towards sustainable
            solar energy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {communities.map((community, index) => {
            const progressPercentage = getProgressPercentage(
              community.currentFunding,
              community.fundingGoal
            );

            return (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow ">
                  <div className="relative">
                    <div className="relative w-full">
                      <ImageWithFallback
                        src={community.image}
                        alt={`${community.name} community`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg absolute top-[40%] left-[30%]">
                        <img
                          src="/assets/location.png"
                          alt="Location"
                          className="w-auto h-8"
                        />
                        <span className="text-white text-lg font-semibold">
                          {community?.name}
                        </span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#FFC404] text-black px-2 py-1 rounded-full text-xs font-medium">
                        {community.status}
                      </span>
                    </div>

                    {/* Community name overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-medium text-lg drop-shadow-lg">
                        {community.name}
                      </h3>
                      <p className="text-white/80 text-sm drop-shadow">
                        {community.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Funding info */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Goal</span>
                        <span className="font-medium">
                          {formatCurrency(community.fundingGoal)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Raised</span>
                        <span className="text-sm font-medium text-yellow-600">
                          {formatCurrency(community.currentFunding)}
                        </span>
                      </div>

                      <Progress
                        value={progressPercentage}
                        className="h-2 mb-2"
                      />

                      <div className="text-right">
                        <span className="text-xs text-gray-500">
                          {progressPercentage}% funded
                        </span>
                      </div>
                    </div>

                    {/* Fund button */}
                    <Button
                      onClick={() => handleFund(community.id)}
                      className="w-full bg-[#000] hover:bg-yellow-500 text-white font-medium"
                      disabled={progressPercentage >= 100}
                    >
                      {progressPercentage >= 100 ? "Fully Funded" : "Fund"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
