"use client"

import { useEffect, useState, useRef } from "react"

import Button from "@/components/Button"
import Spinner from "@/components/Spinner"
import GalleryContent from "@/components/GalleryContent"
import { ImageData } from "@/util/interfaces"
import { API_KEY } from "@/util/config"
import { getDateRange } from "@/util/utility"
import DateSelector from "@/components/DateSelector"


function GalleryPage() {
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null) // Ref for debounce timer

  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()


  // Function to fetch images (debounced)
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      fetchImages()
    }, 2000) // 2 seconds debounce

    return () => {
      // Cleanup timeout when component unmounts or effect reruns
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [currentYear, currentMonth]) // Re-run when year or month changes

  async function fetchImages() {
    setLoading(true)

    const [startDate, endDate] = getDateRange(currentYear, currentMonth)
    console.log("Here is the info:", startDate, endDate)

    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`
      )
      const data = await res.json()

      console.log(data);
      setImagesData(data)
    } catch (err) {
      console.error("Error fetching the data ", err)
    } finally {
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

  function handleDateChange(year: number, month: number) {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  const isNextMonthDisabled =
    currentYear > todayYear ||
    (currentYear === todayYear && currentMonth >= todayMonth)

  return (
    <div className="min-w-screen relative max-h-full min-h-screen max-w-full pb-[10rem]">
      <div className="container relative z-10 flex h-full justify-center">
        <main className="mt-[10rem] w-full max-w-[95%]">
          <h2 className="text-center flex justify-center items-center gap-[1rem] s:flex-col ">
            <span className="text-[3rem] font-[600] text-light-blue  s:text-[2rem]">
              Photos From:
            </span>

            <DateSelector
              onDateChange={handleDateChange}
              currentYear={currentYear}
              currentMonth={currentMonth}
            />
          </h2>

          <p className="my-[2rem] text-center text-light-blue">
            Click an image to view more details, and use the &apos;Prev
            Month&apos; and &apos;Next Month&apos; buttons to browse pictures
            from previous or next months.
          </p>

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

          {loading ? <Spinner /> : <GalleryContent imagesData={imagesData} />}
        </main>
      </div>

      <div className="stars"></div>
      <div className="twinkling"></div>
    </div>
  )
}

export default GalleryPage
