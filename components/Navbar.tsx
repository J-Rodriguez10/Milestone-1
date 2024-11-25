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
    <nav className="container absolute left-0 right-0 top-[2.5rem] z-[99] flex w-full items-center justify-between bg-transparent text-[0.85rem] font-[400] text-light-blue s:block">
      {/* Logo */}
      <p className="gap-[.5rem]font-[600] flex items-center m:mb-[0.5rem] m:text-[1.05rem]">
        <Glitter />
        AstroHub
      </p>

      {/* Navlinks */}
      <ul className="relative flex h-[2rem] gap-[1.8rem] space-x-4 s:right-0 s:mt-[10px] s:justify-end s:gap-[0.8rem] m:text-[0.7rem] m:gap-[0.65rem] ">
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
          <Link href="/asteroids" passHref>
            <span
              className={`hover:text-green-yellow ${
                isActiveLink("/asteroids") ? "text-green-yellow" : ""
              }`}
            >
              Asteroids
            </span>
          </Link>
        </li>
        <li>
          <Link href="/alerts" passHref>
            <span
              className={`hover:text-green-yellow ${
                isActiveLink("/alerts") ? "text-green-yellow" : ""
              }`}
            >
              Alerts
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
              className={`inline-block max-w-[73px] hover:text-green-yellow ${
                isActiveLink(`/gallery/${todaysDate}`)
                  ? "text-green-yellow"
                  : ""
              }`}
            >
              Picture of the Day
            </span>
          </Link>
        </li>
        <li>
          <Link href="/mars-weather" passHref>
            <span
              className={`inline-block max-w-[73px] hover:text-green-yellow ${
                isActiveLink("/mars-weather") ? "text-green-yellow" : ""
              }`}
            >
              Mars ForeCast
            </span>
          </Link>
        </li>
        <li>
          <Link href="/astronauts" passHref>
            <span
              className={`inline-block max-w-[80px] hover:text-green-yellow ${
                isActiveLink("/astronauts") ? "text-green-yellow" : ""
              }`}
            >
              People Currently In Space
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
