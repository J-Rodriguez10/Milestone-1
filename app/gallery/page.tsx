"use client"

import { useEffect, useState } from "react"

import Button from "@/components/Button"
import Spinner from "@/components/Spinner"
import GalleryContent from "@/components/GalleryContent"
import { ImageData } from "@/util/interfaces"
import { API_KEY } from "@/util/config"
import { getDateRange, getMonthName } from "@/util/utility"

function GalleryPage() {
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true) // New loading state
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  // Constants for today's date
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()

  // Populating imagesData state variable
  useEffect(() => {
    fetchImages()
  }, [currentYear, currentMonth])

  // This function fetches images from NASA's API
  async function fetchImages() {
    setLoading(true)

    // Get the date range for a particular month
    const [startDate, endDate] = getDateRange(currentYear, currentMonth)

    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`
      )
      const data = await res.json()
      setImagesData(data)
    } catch (err) {
      console.error("Error fetching the data ", err)
    } finally {
      // Set loading to false after fetching is complete
      setLoading(false)
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentYear(prev => prev + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth(prev => prev + 1)
    }
  }

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentYear(prev => prev - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth(prev => prev - 1)
    }
  }

  // Check if "Next Month" button should be disabled
  const isNextMonthDisabled =
    currentYear > todayYear ||
    (currentYear === todayYear && currentMonth >= todayMonth)

  return (
    <div className="min-w-screen relative max-h-full min-h-screen max-w-full pb-[10rem]">
      {/* Starry Background */}
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div className="container relative z-10 flex h-full justify-center">
        <main className="mt-[10rem] w-full max-w-[95%]">
          
          {/* Header */}
          <h2 className="text-center text-[3rem] font-[600] text-light-blue s:mb-[1.8rem] s:text-[2rem]">
            {`Photos From: ${getMonthName(currentMonth)}, ${currentYear}`}
          </h2>

          <p className="my-[2rem] text-center text-light-blue">
            Click an image to view more details, and use the &apos;Prev
            Month&apos; and &apos;Next Month&apos; buttons to browse pictures
            from previous or next months.
          </p>

          {/* Pagination Buttons */}
          <div className="mb-[3rem] flex w-full justify-between">
            <Button onClick={handlePrevMonth} variant="greenYellow">
              Prev Month
            </Button>
            <Button
              disabled={isNextMonthDisabled}
              onClick={handleNextMonth}
              variant="greenYellow"
            >
              Next Month
            </Button>
          </div>

          {/* Show spinner if loading, otherwise show GalleryContent */}
          {loading ? <Spinner /> : <GalleryContent imagesData={imagesData} />}
        </main>
      </div>
    </div>
  )
}

export default GalleryPage
