import Heading from "@/components/Heading";
import { SubButton } from "@/components/sub-button";
import { checkSubscription } from "@/lib/chacksub";
import { Settings } from "lucide-react";

const Sattingpage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        titel="Settings"
        descripation="Manage Account Settings"
        icon={Settings}
        iconcolor="text-gray-700"
        bgcolor="bg-gray-700/10"
      />
      <div className=" px-4 lg:px-8 space-y-4">
        <div className=" text-muted-foreground test-sm">
          {isPro ? "You are Pro User" : "You are Free User"}
        </div>
        <SubButton isPro={isPro} />
      </div>
    </div>
  );
};

export default Sattingpage;
