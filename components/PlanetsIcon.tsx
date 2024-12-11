import { planetsSVG } from "@/public/svgs/staticSVGS"

/**
 * PlanetsIcon Component
 *
 * This component renders an SVG of planets as a decorative background element.
 * It is positioned in the lower-right corner and partially visible due to 
 * controlled scaling and overflow. The component is non-interactive, allowing 
 * user interactions to pass through to elements beneath it.
 *
 * - Positioned with absolute positioning to sit on the background layer.
 * - Uses `pointer-events-none` to ensure it does not block interactions.
 * - Hidden on small screens (`s:hidden`) for better responsiveness.
 */

function PlanetsIcon() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden s:hidden">
      <div className="absolute bottom-[18%] right-[10%] h-[500px] w-[500px] translate-x-[75%] translate-y-[75%]">
        <div className="absolute inset-0 scale-[3.5]">{planetsSVG}</div>
      </div>
    </div>
  )
}

export default PlanetsIcon
