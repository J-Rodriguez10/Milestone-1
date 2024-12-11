"use client"

import { useEffect, useState } from "react"

import RotatingPlanet from "@/components/RotatingPlanet"
// import { fetchMarsWeather } from "@/util/api-fetch"
import StarryBackground from "@/components/StarryBackground"
import { fetchMarsWeather, MarsWeatherData } from "@/util/microservices/microserviceD"


function MarsWeatherPage() {
  const [data, setData] = useState<MarsWeatherData[] | null>(null)

  // Fetching the Alerts Data
  useEffect(() => {
    console.log("Fetching...")
    const fetchData = async () => {
      const res = await fetchMarsWeather() // ^ MICROSERVICE D
      console.log("Fetched Results:", res)
      setData(res)
    }
    fetchData()
  }, [])

  return (
    <div className="min-w-screen relative min-h-screen overflow-hidden">
      {/* Main Content Container */}
      <div className="container relative z-20 flex min-h-screen">
        <main className="min-w-full pt-[10rem] font-[300]">
          {/* Header */}
          <h1 className="text-center text-[2rem] font-[600] italic text-green-yellow">
            Mars ForeCast
          </h1>
          <p className="mb-[2rem] text-center text-[.95rem] text-dark-blue s:text-[5rem] m:text-[.85rem]">
            The Mars Weather webpage shares data from NASA&apos;s rovers, which
            use onboard instruments to monitor temperature, wind, and other
            atmospheric conditions on Mars. Data is reported in
            &quot;sols,&quot; which are Martian days, each lasting approximately
            24 hours and 39 minutes, slightly longer than an Earth day.
          </p>

          {/* Forecast Display */}
          <div className="flex space-x-4 overflow-x-auto px-4">
            {data ? (
              data.map(day => (
                <div
                  key={day.sol}
                  className="min-w-[150px] rounded-lg bg-darkest-blue p-4 text-[0.75rem] text-white shadow-lg"
                >
                  <h2 className="text-xl font-bold">Sol {day.sol}</h2>
                  <p className="text-gray-300">Season: {day.season}</p>
                  <div className="mt-2">
                    <p>🌡️ Min Temp: {day.temperature.min}°C</p>
                    <p>🌡️ Max Temp: {day.temperature.max}°C</p>
                    <p>🌡️ Avg Temp: {day.temperature.average}°C</p>
                  </div>
                  <div className="mt-2">
                    <p>
                      🌬️ Wind: {day.wind.speed} m/s {day.wind.direction}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p>📈 Pressure: {day.pressure} Pa</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full text-center text-gray-400">
                Loading Forecast...
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Shining Stars Background*/}
      <StarryBackground />
      {/* Rotating Planet PNG */}
      <RotatingPlanet planet="mars" />
    </div>
  )
}

export default MarsWeatherPage
