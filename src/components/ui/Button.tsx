import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-800 text-white hover:bg-red-700 focus:ring-red-500 !rounded-md",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        outline:
          "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
        ghost:
          "text-red-600 hover:bg-red-100 focus:ring-red-400",
      },
      size: {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2 text-base",
        lg: "px-8 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
