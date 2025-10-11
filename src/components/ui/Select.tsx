import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options = [], children, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
            : children}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
