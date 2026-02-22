"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const leftLinks = [
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "Login",
    href: "/login",
  },
];

const rightLinks = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "pricing",
    href: "/pricing",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 max-w-7xl mx-auto">
      <div>
        {leftLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="px-4 text-gray-700 dark:text-gray-200 text-md hover:text-gray-900 font-medium"
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Logo */}
      <div>
        <Link href="#" className="text-2xl font-bold">
          <h1>LOGO</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {rightLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="px-4 text-gray-700 dark:text-gray-200 text-md hover:text-gray-900 font-medium"
          >
            {link.name}
          </Link>
        ))}

        {/* CTA Button */}
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer text-sm flex items-center">
          Get Started
          <ArrowRight className="ml-2 size-4" />
        </button>
      </div>
    </div>
  );
};
