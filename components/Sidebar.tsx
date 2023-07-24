"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  CodeIcon,
  Settings,
} from "lucide-react";
import { FreeCounter } from "./FreeCounte";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Text Generation",
    icon: MessageSquare,
    href: "/conversations",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Audio Generation",
    icon: Music,
    href: "/audio",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-sky-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimiteCount: number;
  isPro: boolean;
}
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const Sidebar = ({ apiLimiteCount = 0, isPro = false }: SidebarProps) => {
  const pathName = usePathname();
  return (
    <div className=" space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-12 h-12 mr-4 rounded-full">
            <Image
              fill
              src="/eno.png"
              alt="logo"
              className="w-full h-full object-cover"
              sizes="100%"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat)}>Eno~AI</h1>
        </Link>
        <div className=" space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimiteCount={apiLimiteCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;
