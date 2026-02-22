import Marquee from "react-fast-marquee";
import Image from "next/image";

interface User {
    name: string,
    action: string,
    avatar: string
}

const users: User[] = [
  {
    name: "Alex M.",
    action: "completed Writing Task 1",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah K.",
    action: "started Speaking Practice",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "John D.",
    action: "scored 7.5 in Listening",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    name: "Emily R.",
    action: "reviewing Reading errors",
    avatar: "https://i.pravatar.cc/150?u=emily",
  },
  {
    name: "Michael B.",
    action: "joined Mock Test #3",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    name: "Jessica T.",
    action: "practicing Vocabulary",
    avatar: "https://i.pravatar.cc/150?u=jessica",
  },
  {
    name: "David W.",
    action: "analyzing Writing Task 2",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "Linda G.",
    action: "listening to Podcast",
    avatar: "https://i.pravatar.cc/150?u=linda",
  },
];

const UserCard = ({ user }: {user: User}) => (
  <div className="flex items-center gap-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-2 rounded-full mx-4 shadow-sm min-w-50">
    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-700">
      <Image src={user.avatar} alt={user.name} fill className="object-cover" />
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
        {user.name}
      </span>
      <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
        {user.action}
      </span>
    </div>
  </div>
);

export const LearnWithOther = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-6 overflow-hidden py-4 mt-4 relative">
      {/* First Row: Left to Right, Faster */}
      <Marquee direction="right" speed={40} gradient={false} pauseOnHover={true}>
        {users.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </Marquee>

      {/* Second Row: Right to Left, Slower */}
      <Marquee direction="left" speed={20} gradient={false} pauseOnHover={true}>
        {[...users].reverse().map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </Marquee>

      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
    </div>
  );
};
