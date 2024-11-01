"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Glitter from "./Glitter"

function Navbar() {
  const pathname = usePathname()
  const todaysDate: string = new Date().toLocaleDateString("en-CA")

  // Checking if link is active to apply active link styles
  const isActiveLink = (path: string) => pathname === path

  return (
    <nav className="s:block container absolute left-0 right-0 top-[3rem] z-[99] flex w-full items-center justify-between bg-transparent text-[0.85rem] font-[400] text-light-blue">
      {/* Logo */}
      <p className="gap-[.5rem]font-[600] flex items-center">
        <Glitter />
        AstroHub
      </p>

      {/* Navlinks */}
      <ul className="s:gap-[0.8rem] s:right-0 s:justify-end s:mt-[10px] relative flex h-[2rem] gap-[2.75rem] space-x-4">
        <li>
          <Link href="/" passHref>
            <span
              className={`hover:text-green-yellow ${
                isActiveLink("/") ? "text-green-yellow" : ""
              }`}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/gallery" passHref>
            <span
              className={`upperline hover:text-green-yellow ${
                pathname === "/gallery"
                  ? "upperline-active text-green-yellow"
                  : ""
              }`}
            >
              Gallery
            </span>
          </Link>
        </li>
        <li>
          <Link href={`/gallery/${todaysDate}`} passHref>
            <span
              className={`hover:text-green-yellow ${
                isActiveLink(`/gallery/${todaysDate}`)
                  ? "text-green-yellow"
                  : ""
              }`}
            >
              Picture of the Day
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
