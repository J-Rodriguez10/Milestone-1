interface ToggleMenuIconProps {
  className?: string
}

function ToggleMenuIcon({ className = "" }: ToggleMenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M3 9l3 3l-3 3" />
        <path d="M5 5h14" />
        <path d="M10 12h9" />
        <path d="M5 19h14" />
      </g>
    </svg>
  )
}

export default ToggleMenuIcon
