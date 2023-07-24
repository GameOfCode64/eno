"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNT } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
  apiLimiteCount: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimiteCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isPro) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimiteCount} / {MAX_FREE_COUNT} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimiteCount / MAX_FREE_COUNT) * 100}
            />
          </div>
          <Button
            onClick={proModal.onOpen}
            className="w-full"
            variant="premium"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
