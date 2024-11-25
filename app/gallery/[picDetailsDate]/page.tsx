"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import Button from "@/components/Button"
import Loading from "@/app/loading"
import { ImageData } from "@/util/interfaces"

interface PicDetailsPageProps {
  params: {
    picDetailsDate: string
  }
}

function PicDetailsPage({ params }: PicDetailsPageProps) {
  const [picDetails, setPicDetails] = useState<ImageData | null>(null)

  useEffect(() => {
    const fetchImgData = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&date=${params.picDetailsDate}`
        )
        if (!res.ok) {
          throw new Error(
            "Failed to fetch Picture Details for date: " + params.picDetailsDate
          )
        }
        const picData = await res.json()
        setPicDetails(picData)
      } catch (err) {
        console.error(err)
      }
    }

    fetchImgData()
  }, [params.picDetailsDate])

  if (!picDetails) {
    return <Loading />
  }

  // Destructuring the picDetails stateVariable for easier access in component.
  const {
    title,
    date,
    explanation,
    url,
    copyright: author,
    media_type
  } = picDetails

  // Checking to see if media is either an image or video. This will change how the component is structured.
  const isImage = media_type === "image"
  const isVideo = media_type === "video"

  return (
    <div className="relative z-[0] h-auto min-h-screen w-screen overflow-hidden bg-custom-gradient-dark-blue">
      <div className="container h-auto min-h-full">
        {/* Page's Main Content */}
        <main className="flex h-auto min-h-full w-full items-center justify-center pb-[3rem] pt-[6rem]">
          {/* Justify Between Div */}
          <div className="flex min-h-full w-full items-center gap-[1rem] m:flex-col m:gap-[2rem] m:mt-[3rem]">
            {/* Left container - Image Details */}
            <article className="flex min-h-full max-w-[45%] flex-col gap-[1rem] m:min-w-full">
              {/* Title */}
              <h2 className="text-[2rem] font-[600] text-light-blue">
                &quot;{title}&quot;
                {/* Conditionally rendering the author */}
                {author && (
                  <span className="text-green-yellow"> by {author}</span>
                )}
              </h2>

              {/* Date */}
              <h3 className="text-[2rem] font-[600] text-green-yellow">
                {date}
              </h3>

              {/* Explanation */}
              <p className="text-[.9rem] font-[400] text-dark-blue">
                {explanation}
              </p>

              {/* Back to Gallery Button */}
              <div className="mt-[1rem]">
                <Button href="/gallery">Back To Gallery</Button>
              </div>
            </article>

            {/* Right container - Media Display (Image or Video) */}
            <aside className="relative flex h-auto min-h-[70vh] min-w-[550px] w-[50vw] items-center justify-center bg-black m:min-w-full">
              {/* Displaying either an Image or iframe based on media type */}
              {isImage ? (
                <Image
                  fill
                  className="object-contain"
                  quality={50}
                  alt={title}
                  src={url}
                  loading="eager"
                />
              ) : isVideo ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`${url}?autoplay=0&controls=1&mute=1`}
                  title={title}
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <p className="text-white">This content is unavailable.</p>
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PicDetailsPage
