"use client"

import { useState } from "react"

import Glitter from "./Glitter"
import NavLink from "./NavLink"
import ToggleMenuIcon from "./ToggleMenuIcon"
import MobileNavMenu from "./MobileNavMenu"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  function toggleMenu() {
    setIsMenuOpen(prev => !prev)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  const todaysDate: string = new Date().toLocaleDateString("en-CA")

  return (
    <>
      <nav className="container absolute left-0 right-0 z-[99] flex w-full items-center justify-between bg-transparent !pt-[2rem] text-[0.8rem] font-[300] text-light-blue">
        {/* Logo */}
        <p className="flex h-full items-center gap-[.5rem] font-[500] m:text-[1.05rem]">
          <Glitter />
          AstroHub
        </p>

        {/* Navlinks for larger screens */}
        <ul className="relative flex h-[2rem] items-center gap-[1.8rem] space-x-4 s:right-0 s:mt-[10px] s:hidden s:justify-end s:gap-[0.8rem] m:gap-[0.65rem] m:text-[0.7rem]">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/asteroids">Asteroids</NavLink>
          </li>
          <li>
            <NavLink href="/alerts">Alerts</NavLink>
          </li>
          <li>
            <NavLink href="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink href={`/gallery/${todaysDate}`}>
              Picture of the Day
            </NavLink>
          </li>
          <li>
            <NavLink href="/mars-weather" className="upperline">
              Mars ForeCast
            </NavLink>
          </li>
          <li>
            <NavLink href="/astronauts">People In Space</NavLink>
          </li>
        </ul>

        {/* Navlinks Toggle Menu Button for mobile */}
        <button
          className="hidden text-light-blue s:block"
          title="Click on button to reveal navigation links menu"
          onClick={toggleMenu}
        >
          <ToggleMenuIcon />
        </button>
      </nav>
      {/* NavLinks Menu for mobile (slides from the left of the screen) */}
      <MobileNavMenu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        todaysDate={todaysDate}
      />
    </>
  )
}

export default Navbar
