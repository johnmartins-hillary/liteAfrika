import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CommunityDetailPageProps {
  community: {
    id: string;
    name: string;
    image: string;
    fundingGoal: number;
    currentFunding: number;
    status: string;
    location: string;
    population: number;
    established: string;
    description: string;
  } | null;
  onBack: () => void;
  onFund: (amount: number) => void;
}

export function CommunityDetailPage({
  community,
  onBack,
  onFund,
}: CommunityDetailPageProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");

  if (!community) return null;

  const progressPercentage = Math.round(
    (community.currentFunding / community.fundingGoal) * 100
  );
  const remainingAmount = community.fundingGoal - community.currentFunding;

  const predefinedAmounts = [25, 50, 100, 250];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const handleFundSubmit = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      onFund(amount);
      toast.success(`Thank you for funding $${amount} to ${community.name}!`);
      setSelectedAmount(0);
      setCustomAmount("");
    } else {
      toast.error("Please select or enter a valid amount");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Communities
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Community Image and Info */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={community.image}
                  alt={community.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FFC404] text-black px-3 py-1 rounded-full text-sm font-medium">
                    {community.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-medium mb-4">{community.name}</h1>

                {/* Community Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{community.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{community.population.toLocaleString()} people</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Est. {community.established}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium mb-2">About This Community</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {community.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Funding Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-2 border-yellow-200 bg-yellow-50/30">
              <h2 className="text-xl font-medium mb-4">Fund This Community</h2>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Goal</span>
                  <span className="font-medium">
                    {formatCurrency(community.fundingGoal)}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Raised</span>
                  <span className="font-medium">
                    {formatCurrency(community.currentFunding)}
                  </span>
                </div>

                <Progress value={progressPercentage} className="h-3 mb-2" />

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {progressPercentage}% funded
                  </span>
                  <span className="text-gray-500">
                    {formatCurrency(remainingAmount)} to go
                  </span>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Amount</h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 text-center border rounded-lg transition-colors ${
                        selectedAmount === amount
                          ? "border-yellow-400 bg-[#FFC404] text-black font-medium"
                          : "border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                </div>
              </div>

              {/* Fund Button */}
              <Button
                onClick={handleFundSubmit}
                disabled={
                  progressPercentage >= 100 ||
                  (!selectedAmount && !customAmount)
                }
                className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
              >
                {progressPercentage >= 100
                  ? "Fully Funded"
                  : `Fund ${
                      selectedAmount
                        ? `$${selectedAmount}`
                        : customAmount
                        ? `$${customAmount}`
                        : "Community"
                    }`}
              </Button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Your contribution will help bring solar energy to this community
              </p>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
