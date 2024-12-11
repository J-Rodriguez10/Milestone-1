"use client"

import { useEffect, useState } from "react"

import RotatingPlanet from "@/components/RotatingPlanet"
// import { fetchDONKIotifications } from "@/util/api-fetch"
import { convertTimestampToReadableDate } from "@/util/utility"
import StarryBackground from "@/components/StarryBackground"
import { EnrichedDONKINotification, fetchDONKINotifications } from "@/util/microservices/microserviceC"



function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<EnrichedDONKINotification | null>(null)
  const [data, setData] = useState<EnrichedDONKINotification[] | null>(null)

  function handleAlertClick(alert: EnrichedDONKINotification) {
    setSelectedAlert(alert)
  }

  useEffect(() => {
    // Fetch Alerts Data
    console.log("Fetching...")
    const fetchData = async () => {
      const res = await fetchDONKINotifications() //^  MICROSERVICE C
      console.log("Fetched Results:", res)
      setData(res)
    }
    fetchData()
  }, [])

  return (
    <div className="min-w-screen relative min-h-screen overflow-hidden">
      {/* Main Content Container */}
      <div className="container relative z-20 flex min-h-screen">
        <main className="flex min-h-[750px] min-w-full justify-between gap-[20px] pb-[1rem] pt-[10rem] font-[300] text-dark-blue s:flex-col s:gap-[3.5rem] s:pb-[4rem]">
          {/* Left Container */}
          <div className="max-h-[500px] min-w-[35%]">
            {/* Title */}
            <h1 className="m-0 mb-[1.5rem] p-0 text-[2rem] font-[600] italic text-green-yellow">
              NASA SPACE ALERTS
            </h1>
            <p className="mb-[1rem] mt-[-1rem] p-0 text-[.9rem] m:text-[.8rem]">
              Explore the latest solar events and space weather updates from
              NASA&apos;s DONKI system. Here you’ll find the latest alerts about
              solar events, such as Coronal Mass Ejections (CMEs), solar flares,
              and other space weather phenomena that impact our solar system!
            </p>
            {/* Alerts Display */}
            <ul className="grid h-[70%] max-h-[250px] w-auto max-w-full list-none grid-cols-2 overflow-scroll text-gray-300">
              {data ? (
                data.map((alert, index) => (
                  <li
                    key={index}
                    className={`mx-[2px] my-[4px] cursor-pointer text-[0.85rem] hover:text-dark-green-yellow ${selectedAlert?.messageID === alert.messageID ? "text-dark-green-yellow" : ""} m:text-[0.8rem]`}
                    onClick={() => handleAlertClick(alert)}
                  >
                    {convertTimestampToReadableDate(alert.messageIssueTime)} ,{" "}
                    {alert.messageType}
                  </li>
                ))
              ) : (
                <p className="text-gray-400">Loading alerts...</p>
              )}
            </ul>
          </div>

          {/* Right Container - Display */}
          <aside className="max-h-[500px] min-w-[65%] overflow-scroll rounded-[10px] bg-darkest-blue px-[2rem] py-[1rem] s:text-[.9rem] m:text-[.95rem]">
            {selectedAlert ? (
              <>
                <h2 className="mb-2 text-2xl text-white">
                  {selectedAlert.fullName} - {selectedAlert.messageIssueTime}
                </h2>
                <p className="text-gray-300">{selectedAlert.description}</p>

                {/* Display the message body */}
                <pre className="mt-4 whitespace-pre-wrap text-gray-300">
                  {selectedAlert.messageBody}
                </pre>
              </>
            ) : (
              <p className="text-gray-400">
                Select an alert to view more details
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

export default AlertsPage
