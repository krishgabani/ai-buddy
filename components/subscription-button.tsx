"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loading-spinner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Button
          disabled={loading}
          variant={isPro ? "default" : "premium"}
          onClick={onClick}
        >
          {isPro ? "Manage Subscription" : "Upgrade"}
          {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
      )}
    </>
  );
};

export { SubscriptionButton };
