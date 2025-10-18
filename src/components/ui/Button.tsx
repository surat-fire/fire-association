import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn("pt-2 pb-1.5 px-4 rounded-md text-white text-[13px] font-medium border border-[var(--primary)] bg-[var(--primary)] hover:bg-white hover:text-[var(--primary)]", className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
