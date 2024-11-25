/**
 * Loading Component
 * 
 * This component renders a full-screen loading animation with a dark blue gradient background.
 * 
 * Key Notes:
 * - The outer `div` uses `relative` positioning to serve as a reference point for any child elements
 *   with `absolute` or `z-index` positioning.
 * - The `h-screen` and `w-screen` classes ensure the component covers the entire viewport.
 * - The `overflow-hidden` class prevents content from spilling outside the component's boundaries.
 * - Customize the loader's appearance using the `.loader` class in your CSS.
 */
function Loading() {
  return (
    <div className="relative z-[0] h-screen w-screen overflow-hidden bg-custom-gradient-dark-blue">
      <main className="container flex min-h-full items-center justify-center">
        <div className="loader"></div>
      </main>
    </div>
  )
}

export default Loading
