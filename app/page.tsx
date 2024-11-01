"use client"

import Button from "@/components/Button"
import Glitter from "@/components/Glitter"
import { shuttleSVG, planetsSVG } from "@/public/svgs/staticSVGS"

function HomePage() {
  const todaysDate: string = new Date().toLocaleDateString("en-CA")

  return (
    <div className="relative z-[0] h-screen w-screen  bg-custom-gradient-dark-blue overflow-hidden">
      {/* Planets svg */}
      <div className="s:hidden absolute bottom-[-30%] right-[-15%] z-[-1] h-[50%] w-[600px] scale-[3.25]">
        {planetsSVG}
      </div>

      {/* Main Page Container*/}
      <main className="container relative flex h-full items-center">
        {/* Shuttle icon */}
        <div className="absolute left-[-40px] top-[5rem]">{shuttleSVG}</div>

        {/* Hero */}
        <div className="mt-[60px] flex max-w-[410px] flex-col gap-[1rem]">
          {/* Website greeting */}
          <h2 className="text-[3.2rem] font-[700] text-light-blue">
            Welcome to <span className="text-green-yellow">AstroHub!</span>
          </h2>
          <p className="text-dark-blue">
            AstroHub brings the wonders of space to you with stunning images and
            fascinating insights. Explore our{" "}
            <span className="text-dark-green-yellow">space gallery</span> or
            check out the{" "}
            <span className="text-dark-green-yellow">
              {" "}
              Astronomy Picture of the Day
            </span>{" "}
            to dive deeper into the cosmos.
          </p>

          {/* CTA section */}
          <section className="w-[385px]">
            {/* no login required */}
            <div className="flex w-[100%] items-center justify-center gap-[.5rem] py-[1rem] text-dark-green-yellow">
              <Glitter variant="greenYellow" />
              No Login Required
              <Glitter variant="greenYellow" />
            </div>
            {/* cta buttons */}
            <div className="mt-[1rem] flex gap-[4.5rem] pl-[.5rem]">
              <Button href={`/gallery/${todaysDate}`} variant="greenYellow">
                Pic of The Day
              </Button>
              <Button href="/gallery">Gallery</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default HomePage
