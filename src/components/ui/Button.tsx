import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn("py-2 px-4 rounded-md text-white text-[13px] font-medium border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary)]", className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
