"use client"

import Button from "@/components/Button"
import Glitter from "@/components/Glitter"
import PlanetsIcon from "@/components/PlanetsIcon"
import { shuttleSVG } from "@/public/svgs/staticSVGS"

function HomePage() {
  const todaysDate: string = new Date().toLocaleDateString("en-CA")

  return (
    <div className="min-h-screen w-screen bg-custom-gradient-dark-blue">
      <main className="relative pb-[4rem] pt-[10rem]">
        {/* Content Container */}
        <div className="container mx-auto flex flex-col items-start justify-start px-4">
          {/* Shuttle Icon */}
          <div className="ml-[-2.5rem] flex h-[60px] w-[250px] items-center justify-start">
            {shuttleSVG}
          </div>

          {/* Hero Section */}
          <section className="flex max-w-[410px] flex-col gap-[1rem]">
            <h2 className="text-[3.2rem] font-[700] text-light-blue">
              Welcome to <span className="text-green-yellow">AstroHub!</span>
            </h2>
            <p className="text-dark-blue">
              AstroHub brings the wonders of space to you with stunning images
              and fascinating insights. Explore our{" "}
              <span className="text-dark-green-yellow">space gallery</span> or
              check out the{" "}
              <span className="text-dark-green-yellow">
                Astronomy Picture of the Day
              </span>{" "}
              to dive deeper into the cosmos. <br />
              Data sourced from{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://api.nasa.gov/"
                className="cursor-pointer text-dark-green-yellow hover:text-green-yellow"
              >
                NASA&apos;s APIs!
              </a>
            </p>

            {/* CTA Section */}
            <section className="w-[385px]">
              {/* "No Login Required" Container */}
              <div className="flex w-full items-center justify-center gap-[.5rem] py-[1rem] text-dark-green-yellow">
                <Glitter variant="greenYellow" />
                No Login Required
                <Glitter variant="greenYellow" />
              </div>
              {/* CTA Buttons */}
              <div className="mt-[1rem] flex gap-[4.5rem] pl-[.5rem]">
                <Button href={`/gallery/${todaysDate}`} variant="greenYellow">
                  Pic of The Day
                </Button>
                <Button href="/gallery" className="min-w-[146px]">Gallery</Button>
              </div>
            </section>
          </section>
        </div>
      </main>
      {/* Planets Icon placed at the lower right corner*/}
      <PlanetsIcon />
    </div>
  )
}

export default HomePage
