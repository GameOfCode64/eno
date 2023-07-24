"use client";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

interface MobialsidebarProps {
  apiLimiteCount: number;
  isPro: boolean;
}

const Mobilesidebar = ({
  apiLimiteCount = 0,
  isPro = false,
}: MobialsidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimiteCount={apiLimiteCount} />
      </SheetContent>
    </Sheet>
  );
};

export default Mobilesidebar;
