import { Avatar, AvatarImage } from "./ui/avatar";

export const BotAvater = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" className="object-cover" />
    </Avatar>
  );
};
