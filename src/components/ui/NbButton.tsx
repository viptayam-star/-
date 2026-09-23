import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "yellow" | "blue" | "red" | "green" | "paper" | "ink";

const VARIANTS: Record<Variant, string> = {
  yellow: "bg-nb-yellow hover:bg-[#F6DD2E] text-nb-ink",
  blue: "bg-nb-blue hover:bg-[#1D87DD] text-white",
  red: "bg-nb-red hover:bg-[#EF4646] text-white",
  green: "bg-nb-green hover:bg-[#1DAE52] text-white",
  paper: "bg-white hover:bg-nb-muted text-nb-ink",
  ink: "bg-nb-ink hover:bg-[#2B2B2B] text-white",
};

const SIZES = {
  md: "px-5 py-3 text-sm shadow-nb-sm hover:shadow-nb active:shadow-none",
  sm: "px-3 py-1.5 text-xs shadow-nb-xs hover:shadow-nb-sm active:shadow-none",
} as const;

/**
 * Neubrutalism button: thick ink border + hard offset shadow.
 * Hover lifts (up-left, bigger shadow), active presses into the shadow.
 */
export function NbButton({
  variant = "yellow",
  size = "md",
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: keyof typeof SIZES;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-[3px] border-nb-ink font-bold transition-all duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
