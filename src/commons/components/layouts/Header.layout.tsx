import React, { useState } from "react";
import useUserStore from "@store/userStore";
import Logo from "@commons/components/Logo";
import CustomButton from "@commons/components/CustomButton";
import { PuzzlePieceIcon } from "@heroicons/react/24/solid";
import { HambergerMenu } from "iconsax-react";
import { XCircleIcon } from "@heroicons/react/16/solid";
import Link from "@router/link";
import { FaGithub } from "react-icons/fa";


type Props = {
  className?: string;
} & React.PropsWithChildren;

const HeaderLayout = ({ className = "" }: Props) => {
  const { user } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  const links = [
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "About",
      href: "/about",
    }
  ];

  // Toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={"md:p-8 z-40 w-full flex bg-secondary items-center justify-between h-[10vh] sticky top-0 border-b-[1px] py-2"}>
      <Logo className={"text-white font-outfit w-[6rem] sm:w-[12rem] ml-8"} />

      {/* Hamburger icon for mobile screens */}
      <div className="flex md:hidden mr-8">
        {menuOpen ? (
          <XCircleIcon className="w-8 h-8 text-primary" onClick={toggleMenu} />
        ) : (
          <HambergerMenu className="w-8 h-8 text-primary" onClick={toggleMenu} />
        )}
      </div>

      {/* Desktop links */}
      <nav className="hidden md:flex w-full text-white justify-center gap-12">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-md hover:text-primary transition duration-500">
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute top-[8vh] right-0 w-[50%] bg-white bg-opacity-90 p-4 md:hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block text-secondary text-lg py-2 border-b border-gray-300"
              onClick={toggleMenu} // Close menu on link click
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Join waitlist button */}
      <div className="w-[32rem] mr-4 hidden md:block">
        <div className="flex justify-between items-center gap-4">
            <Link href="https://github.com/ashdeck/ashdeck" target="_blank">
              <CustomButton className="bg-secondary border-[.1px] border-white">
                <div className="flex items-center justify-center w-[10rem] gap-2 ">
                  <FaGithub className="font-bold" size={20} />
                  <p className="font-semibold">Star On Github</p>
                </div>
              </CustomButton>
            </Link>
            <div className="flex ">
            <Link href="/join-our-waitlist">
              <CustomButton className="w-[10rem] border-0 hover-border-0 text-[.8rem] md:text-[1rem] font-semibold">
                Join Waitlist
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
