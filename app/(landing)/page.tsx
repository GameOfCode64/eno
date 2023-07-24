import { LandingContent } from "@/components/LandingContent";
import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingHero } from "@/components/landing-hero";

const Landingpage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default Landingpage;
