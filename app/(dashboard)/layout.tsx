import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitecount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/chacksub";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimiteCount = await getApiLimitecount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimiteCount={apiLimiteCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
