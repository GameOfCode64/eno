import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  titel: string;
  descripation: string;
  icon: LucideIcon;
  iconcolor?: string;
  bgcolor?: string;
}
const Heading = ({
  titel,
  descripation,
  icon: Icon,
  iconcolor,
  bgcolor,
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgcolor)}>
          <Icon className={cn("w-10 h-10", iconcolor)} />
        </div>
        <div>
          <h2 className="font-bold text-3xl">{titel}</h2>
          <p className=" text-sm text-muted-foreground">{descripation}</p>
        </div>
      </div>
    </>
  );
};

export default Heading;
