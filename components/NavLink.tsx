"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void // Also accepts the onClick prop (Optional)
}

function NavLink({ href, children, className = "", onClick}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  // Special line of code to check if the upperline above a navlink should be active
  const upperlineStyle = className.includes("upperline") && isActive ? "upperline-active" : "";

  return (
    <Link href={href} passHref onClick={onClick}>
      <span
        className={`hover:text-green-yellow ${
          isActive ? "text-green-yellow" : ""
        } ${className} ${upperlineStyle}`}
      >
        {children}
      </span>
    </Link>
  )
}

export default NavLink
