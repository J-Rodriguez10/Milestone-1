"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import RotatingPlanet from "@/components/RotatingPlanet"
// import { fetchAstronautsInSpace } from "@/util/api-fetch"
import StarryBackground from "@/components/StarryBackground"
import { AstronautData, fetchAstronautsInSpace } from "@/util/microservices/microserviceB"

type SelectedSpacecraft = {
  craft: string
  crew: string[]
}

function AstronautsPage() {
  const [selectedSpacecraft, setSelectedSpacecraft] =
    useState<SelectedSpacecraft | null>(null)

  const [data, setData] = useState<AstronautData| null>(null)

  // Updates the state with the clicked spacecraft
  function handleIconClick(spacecraft: SelectedSpacecraft) {
    setSelectedSpacecraft(spacecraft)
  }

  // Fetch Alerts Data
  useEffect(() => {
    console.log("Fetching...")
    const fetchData = async () => {
      const res = await fetchAstronautsInSpace();
      console.log("Fetched Results:", res)
      setData(res)
    }
    fetchData()
  }, [])

  return (
    <div className="min-w-screen relative min-h-screen overflow-hidden">
      {/* Main Content Container */}
      <div className="container relative z-20 flex min-h-screen">
        <main className="flex min-w-full justify-between pt-[11rem] font-[300] text-dark-blue s:mt-[2rem] s:flex-col s:gap-[2.5rem] s:pb-[4rem]">
          {/* Left Container */}
          <div className="max-h-[500px] min-w-[40%]">
            {/* Title */}
            <h1 className="mb-[1.5rem] text-[2rem] s:text-center s:text-[1.75rem]">
              There are{" "}
              <span className="font-[700] italic text-green-yellow">
                {data ? data.number_of_people : "???"} people
              </span>{" "}
              in space <span className="font-[700] italic">RIGHT NOW</span>
            </h1>
            {/* Icons */}
            <div className="flex max-h-[70%] w-auto max-w-full flex-wrap gap-[0.5rem] space-x-4 overflow-scroll">
              {data?.spacecrafts?.length ? (
                data.spacecrafts.map((spacecraft, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer hover:text-green-yellow ${
                      selectedSpacecraft?.craft === spacecraft.craft
                        ? "text-green-yellow"
                        : ""
                    }`}
                    onClick={() => handleIconClick(spacecraft)} // Pass the spacecraft object
                  >
                    <Image
                      src={spacecraft.icon}
                      alt={`${spacecraft.craft} Icon`}
                      width={80}
                      height={80}
                    />
                    <p className="text-dark-blu mt-2 text-center">
                      {spacecraft.craft}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="w-full text-center text-gray-400">
                  Loading data...
                </p>
              )}
            </div>
          </div>

          {/* Right Container - Display */}
          <aside className="h-[500px] min-w-[60%] overflow-scroll rounded-[10px] bg-darkest-blue px-[2rem] py-[1rem]">
            {selectedSpacecraft ? (
              <>
                <h2 className="text-xl font-bold">
                  {selectedSpacecraft.craft} Crew
                </h2>
                <ul className="mt-4 space-y-2">
                  {selectedSpacecraft.crew.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-400">
                Select a spacecraft to view its crew.
              </p>
            )}
          </aside>
        </main>
      </div>

      {/* Shining Stars Background*/}
      <StarryBackground />
      {/* Rotating Planet PNG */}
      <RotatingPlanet planet="earth" />
    </div>
  )
}

export default AstronautsPage
