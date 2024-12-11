import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Function for click events
  href?: string; // Optional URL for navigation
  disabled?: boolean;
  variant?: "transparent" | "greenYellow";
  className?: string; // Additional classes
}

function Button({
  children, 
  onClick, // Optional if using URL instead
  href, // Optional URL for navigation
  disabled = false, // Default: not disabled
  variant = "transparent", // Default variant
  className = "", // Additional classes
}: ButtonProps) {
  
  // Define button styles based on variant
  const baseStyles =
    "py-2 px-4 text-[1rem] font-[600] rounded-[3px]";
  const variantStyles: Record<string, string> = {
    transparent:
      "bg-transparent border-[1px] border-light-blue text-light-blue hover:bg-light-blue hover:text-darkest-blue",
    greenYellow:
      "bg-green-yellow border-[1px] text-darkest-blue hover:bg-darkest-blue hover:text-green-yellow hover:border-[1px] hover:border-green-yellow",
  };
  const disabledButtonStyles = "opacity-40 cursor-not-allowed";

  const styles = `${baseStyles} ${variantStyles[variant]} ${className} ${
    disabled && disabledButtonStyles
  }`;

  // Render Link if `href` is provided and the button is not disabled
  if (href && !disabled) {
    return (
      <Link href={href} passHref>
        <button className={styles}>{children}</button>
      </Link>
    );
  }

  // Render button with onClick functionality if no `href`
  return (
    <button className={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
