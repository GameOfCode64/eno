"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  CodeIcon,
  Check,
  Zap,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

const tools = [
  {
    label: "Text Generation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgcolor: "bg-pink-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgcolor: "bg-orange-500/10",
  },
  {
    label: "Audio Generation",
    icon: Music,
    color: "text-emerald-500",
    bgcolor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-sky-700",
    bgcolor: "bg-sky-500/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [isLoading, setisLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setisLoading(true);
      const response = axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Eno
              <Badge className="uppercase text-sm py-1" variant="premium">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className=" text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <div className="bg-violet-600/10 p-1 rounded-md">
                  <Check className="text-violet-700" />
                </div>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
