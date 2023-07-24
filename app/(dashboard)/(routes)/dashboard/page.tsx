"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  CodeIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Text Generation",
    icon: MessageSquare,
    href: "/conversations",
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgcolor: "bg-pink-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgcolor: "bg-orange-500/10",
  },
  {
    label: "Audio Generation",
    icon: Music,
    href: "/audio",
    color: "text-emerald-500",
    bgcolor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-sky-700",
    bgcolor: "bg-sky-500/10",
  },
];
const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the Power of AI
        </h2>
        <p className="text-muted-foreground text-center font-light text-sm md:text-lg">
          Chat with the smartest AI - Experience the power Code
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => {
              router.push(tool.href);
            }}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between cursor-pointer hover:shadow-md transition"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
