import { motion } from "framer-motion"
import Image from "next/image"

// This component displays a rotating planet animation using Framer Motion and Next.js Image.
function RotatingPlanet({ planet }: { planet: "earth" | "mars" }) {
  // Define planet-specific details
  const planetDetails = {
    earth: {
      src: "https://cdn.pixabay.com/photo/2012/04/01/17/14/earth-23594_960_720.png",
      alt: "Earth Icon"
    },
    mars: {
      src: "https://www.picng.com/upload/mars_planet/png_mars_planet_6494.png",
      alt: "Mars Icon"
    }
  }

  const { src, alt } = planetDetails[planet] // Dynamically select planet details

  return (
    <motion.div
      className="absolute bottom-[-45%] right-[-20%] z-10 h-[800px] w-[800px] overflow-hidden s:hidden"
      animate={{ rotate: 360 }} // Rotate 360 degrees
      transition={{
        duration: 400, // Duration of one complete rotation
        repeat: Infinity, // Repeat indefinitely
        ease: "linear" // Smooth continuous rotation
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        loading="eager"
        className="saturate-80 opacity-70 filter"
      />
    </motion.div>
  )
}

export default RotatingPlanet
