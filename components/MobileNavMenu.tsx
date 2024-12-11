"use client";

import { motion, AnimatePresence } from "framer-motion";

import NavLink from "./NavLink";

interface MobileNavMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  todaysDate: string;
}

function MobileNavMenu({ isMenuOpen, closeMenu, todaysDate }: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[99] bg-black bg-opacity-50 s:block"
          onClick={closeMenu}
        >
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="absolute left-0 top-0 z-[99] h-screen w-[70vw] max-w-[220px] rounded-r-lg bg-gradient-to-br from-gray-800 to-gray-900 text-light-blue shadow-lg s:block"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            <ul className="flex flex-col gap-6 px-[1rem] py-[1.6rem]">
              <li>
                <NavLink href="/" onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink href="/asteroids" onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  Asteroids
                </NavLink>
              </li>
              <li>
                <NavLink href="/alerts" onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  Alerts
                </NavLink>
              </li>
              <li>
                <NavLink href="/gallery" onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink href={`/gallery/${todaysDate}`} onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  Picture of the Day
                </NavLink>
              </li>
              <li>
                <NavLink href="/mars-weather" onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  Mars ForeCast
                </NavLink>
              </li>
              <li>
                <NavLink href="/astronauts" onClick={closeMenu} className="block rounded-md py-2 pl-4 hover:bg-gray-700">
                  People In Space
                </NavLink>
              </li>
            </ul>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavMenu;
