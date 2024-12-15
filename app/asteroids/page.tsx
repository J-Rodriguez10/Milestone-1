"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import RotatingPlanet from "@/components/RotatingPlanet"
// import { fetchAsteroids } from "@/util/api-fetch"
import { getTodaysDate } from "@/util/utility"
import StarryBackground from "@/components/StarryBackground"
import {
  Asteroid,
  AsteroidResponse,
  fetchAsteroids
} from "@/util/microservices/microserviceA"

function AsteroidsPage() {
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(
    null
  )
  const [data, setData] = useState<AsteroidResponse | null>(null)
  const today = getTodaysDate()

  useEffect(() => {
    // Fetch asteroid data for a specific date range
    console.log("Fetching...")
    const fetchData = async () => {
      const res = await fetchAsteroids(today) //^  MICROSERVICE A
      console.log("Fetched Results:", res)
      setData(res)
    }

    fetchData()
  }, [today])

  // Updates the state with the clicked asteroid
  function handleIconClick(asteroid: Asteroid) {
    setSelectedAsteroid(asteroid)
  }

  return (
    <div className="min-w-screen relative h-auto min-h-screen overflow-hidden">
      {/* Main Content Container */}
      <div className="container relative z-20 flex min-h-screen">
        <main className="flex min-h-[750px] min-w-full justify-between gap-[20px] pt-[11rem] font-[300] text-dark-blue s:flex-col s:pb-[2rem]">
          {/* Left Container */}
          <div className="max-h-[500px] min-w-[40%]">
            {/* Title */}
            <h1 className="mb-[0.5rem] mt-[-1rem] text-[2rem] font-[600] italic text-green-yellow m:text-[1.4rem]">
              Asteroids Near Earth
            </h1>
            <p className="m:text-[0.9rem]">
              The webpage provides real-time data on near-Earth objects (NEOs)
              gathered from NASA&apos;s Asteroid API. It displays key
              information about asteroids, including their names, sizes, speeds,
              and proximity to Earth.{" "}
              <span className="font-[500] italic text-dark-green-yellow">
                {" "}
                - Data as of: {today}
              </span>
            </p>

            {/* Astroid's Data */}
            <div className="mt-[1rem] flex max-h-[70%] w-auto max-w-full flex-wrap gap-[0.5rem] space-x-4 overflow-scroll">
              {data?.asteroids?.length ? (
                data.asteroids.map((asteroid, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer flex-col items-center justify-center hover:text-green-yellow ${
                      selectedAsteroid?.name === asteroid.name
                        ? "text-green-yellow"
                        : ""
                    }`}
                    onClick={() => handleIconClick(asteroid)}
                  >
                    <Image
                      src={asteroid.icon_url}
                      alt={`${asteroid.name}'s Icon`}
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                    <p className="text-dark-blu mt-2 text-center">
                      {asteroid.name}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400">Loading asteroids...</p>
              )}
            </div>
          </div>

          {/* Right Container - Display */}
          <aside className="h-[500px] min-w-[60%] overflow-scroll rounded-[10px] bg-darkest-blue px-[2rem] py-[1rem]">
            {selectedAsteroid ? (
              <div className="space-y-4">
                {/* Asteroid Name */}
                <h2 className="text-2xl font-bold">{selectedAsteroid.name}</h2>

                {/* Estimated Diameter */}
                <div>
                  <h3 className="text-lg font-semibold">
                    Estimated Diameter (km):
                  </h3>
                  <p>
                    Min:{" "}
                    <span className="text-light-blue">
                      {selectedAsteroid.estimated_diameter.estimated_diameter_min.toFixed(
                        2
                      )}
                    </span>
                  </p>
                  <p>
                    Max:{" "}
                    <span className="text-light-blue">
                      {selectedAsteroid.estimated_diameter.estimated_diameter_max.toFixed(
                        2
                      )}
                    </span>
                  </p>
                </div>

                {/* Potential Hazard Status */}
                <div>
                  <h3 className="text-lg font-semibold">Hazard Status:</h3>
                  <p>
                    {selectedAsteroid.is_potentially_hazardous ? (
                      <span className="font-bold text-red-500">
                        Potentially Hazardous
                      </span>
                    ) : (
                      <span className="font-bold text-green-500">
                        Not Hazardous
                      </span>
                    )}
                  </p>
                </div>

                {/* Close Approach Data */}
                <div>
                  <h3 className="text-lg font-semibold">
                    Close Approach Data:
                  </h3>
                  <p>
                    Date:{" "}
                    <span className="text-light-blue">
                      {selectedAsteroid.close_approach_data.close_approach_date}
                    </span>
                  </p>
                  <p>
                    Relative Velocity:{" "}
                    <span className="text-light-blue">
                      {Number(
                        selectedAsteroid.close_approach_data.relative_velocity
                          .kilometers_per_hour
                      ).toLocaleString()}{" "}
                      km/h
                    </span>
                  </p>
                  <p>
                    Miss Distance:{" "}
                    <span className="text-light-blue">
                      {Number(
                        selectedAsteroid.close_approach_data.miss_distance
                          .kilometers
                      ).toLocaleString()}{" "}
                      km
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">
                Select an asteroid to view details.
              </p>
            )}
          </aside>
        </main>
      </div>

      {/* Shining Stars Background*/}
      <StarryBackground />
      {/* Rotating Earth PNG */}
      <RotatingPlanet planet="earth" />
    </div>
  )
}

export default AsteroidsPage
