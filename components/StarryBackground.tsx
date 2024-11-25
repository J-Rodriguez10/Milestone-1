/**
 * StarryBackground Component
 * 
 * Note: This component creates a starry background effect using two divs (`stars` and `twinkling`).
 * To ensure the effect works correctly, the parent container of this component must have 
 * `position: relative` set in its CSS. This allows the absolute positioning of the stars and twinkling layers.
 */
function StarryBackground() {
  return (
    <>
      <div className="stars"></div>
      <div className="twinkling"></div>
    </>
  )
}

export default StarryBackground
