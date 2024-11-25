/**
 * Spinner Component
 * 
 * This component renders a loading spinner centered within its parent container.
 * 
 * Key Features:
 * - Uses a `div` with the `loader` class for the spinner animation.
 * - Centers the spinner horizontally and vertically using flexbox utilities.
 * - Designed to indicate loading states in the UI.
 * 
 * Styling:
 * - The appearance and animation of the spinner are controlled via the `loader` CSS class.
 */

function Spinner() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="loader"></div>
    </div>
  )
}

export default Spinner
