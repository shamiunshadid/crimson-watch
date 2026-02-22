import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl serif-text mb-5 sm:mb-0">Test Your IELTS Skill,</h1>
          <h2 className="text-5xl sm:text-6xl font-bold">Supercharge your preparation</h2>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl mt-10 max-w-sm mx-auto text-gray-500 dark:text-gray-200 mb-5 text-center">
            All in one platform, prepare, practice, and get real-time feedback
            to achieve your target band score.
          </p>
          <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-full  transition-all duration-300 ease-in-out cursor-pointer text-md flex items-center relative pr-14 font-medium">
            Get Started for Free
            <div className="h-9 w-9 rounded-full bg-gray-800 dark:bg-gray-200 ml-2 absolute right-2 flex items-center justify-center">
              <ArrowRight className="size-6" />
            </div>
          </button>
        </div>
      </div>


        {/* Big Image */}
      <div className="w-full mt-20 bg-gray-100 dark:bg-gray-800 py-10">
        <div className="max-w-6xl mx-auto  rounded-md ring-5 ring-gray-300 shadow-lg overflow-hidden">
          <Image src="/hero-image.jpg" alt="Hero Image" width={1200} height={600} className="object-cover rounded-md w-full" draggable={false} priority={true}/>
        </div>
      </div>
    </div>
  );
};
