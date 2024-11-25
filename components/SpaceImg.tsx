import Image from "next/image"
import Link from "next/link"

interface SpaceImgProps {
  url: string
  title: string
  date: string
  media_type: string
}

function SpaceImg({ url, title, date, media_type }: SpaceImgProps) {
  const isImage = media_type === "image"
  const isVideo = media_type === "video"

  // Display fallback message if neither image nor video
  if (!isImage && !isVideo) {
    return (
      <div className="relative flex h-48 w-full items-center justify-center border-[3px] border-opaque-light-blue bg-transparent text-center text-white">
        <p>This media has been taken down!</p>
      </div>
    )
  }

  const isPicOfTheDay: boolean = new Date().toLocaleDateString("en-CA") === date

  const blueFrameStyles =
    "relative h-48 w-full cursor-pointer overflow-hidden border-[3px] border-opaque-light-blue bg-transparent hover:border-light-blue"
  const greenFrameStyles =
    "relative h-48 w-full cursor-pointer overflow-hidden border-[3px] border-opaque-green-yellow bg-transparent hover:border-green-yellow"

  return (
    <Link
      title="Clicking on the media will take you to the details page."
      href={`/gallery/${date}`}
      passHref
    >
      <div className={isPicOfTheDay ? greenFrameStyles : blueFrameStyles}>
        <p className="absolute z-[3] flex h-full w-full items-center justify-center bg-backdrop px-[1rem] text-center text-white opacity-0 hover:opacity-100">
          {isPicOfTheDay && (
            <>
              Pic Of The Day <br />
            </>
          )}
          {date} <br />
          {title}
        </p>
        {isImage ? (
          // Display image if media type is 'image'
          <Image
            fill
            className="absolute z-[0] object-cover"
            quality={0}
            alt={title}
            src={url}
            loading="eager"
          />
        ) : (
          // Display video thumbnail if media type is 'video'
          <div className="relative h-full w-full">
            <iframe
              className="pointer-events-none absolute inset-0 h-full w-full"
              src={`${url}?autoplay=0&controls=0&mute=1`}
              title={title}
              allow="encrypted-media; picture-in-picture"
            ></iframe>
            {/* Overlay div to redirect on click without playing */}
            <div className="absolute inset-0 z-[2] bg-black opacity-0 hover:opacity-25"></div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default SpaceImg
