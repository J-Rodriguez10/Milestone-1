import SpaceImg from "./SpaceImg"
import { ImageData } from "../util/interfaces"

interface GalleryContentProps {
  imagesData: ImageData[]
}

// This component is displayed in the Gallery's Page
function GalleryContent({ imagesData }: GalleryContentProps) {
  return (
    <div className="gallery-container">
      {imagesData.map((imageData, index) => (
        <SpaceImg
          key={index}
          url={imageData.url}
          title={imageData.title}
          date={imageData.date}
          media_type={imageData.media_type}
        />
      ))}
    </div>
  )
}

export default GalleryContent
