/**
 * Glitter Component
 * 
 * This component renders a star-like SVG shape with a customizable color variant.
 * 
 * Props:
 * - `variant` (optional): Specifies the color of the glitter. Can be "blue" (default) or "greenYellow".
 * 
 * The color is determined by the `variants` mapping and applied to the SVG's `fill` attribute.
 */

interface GlitterProps {
  variant?: "blue" | "greenYellow"
}

function Glitter({ variant = "blue" }: GlitterProps) {
  const variants: Record<string, string> = {
    blue: "#8FE5FF",
    greenYellow: "#D7F561"
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 23 23"
    >
      <path
        fill={`${variants[variant]}`}
        d="M10.562 1.534c.322-.87 1.554-.87 1.876 0l2.279 6.159a1 1 0 00.59.59l6.158 2.28c.871.321.871 1.553 0 1.875l-6.158 2.279a1 1 0 00-.59.59l-2.28 6.158c-.321.871-1.553.871-1.875 0l-2.279-6.158a1 1 0 00-.59-.59l-6.159-2.28c-.87-.321-.87-1.553 0-1.875l6.159-2.279a1 1 0 00.59-.59l2.28-6.159z"
      ></path>
    </svg>
  )
}

export default Glitter
