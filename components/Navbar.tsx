import { UserButton } from "@clerk/nextjs";

import Mobilesidebar from "./Mobilesidebar";
import { getApiLimitecount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/chacksub";
const Navbar = async () => {
  const apiLimiteCount = await getApiLimitecount();
  const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4">
      <Mobilesidebar apiLimiteCount={apiLimiteCount} isPro={isPro} />
      <div className="w-full flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
