import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, label, error, ...props }, ref) => {
		return (
			<div className="flex flex-col space-y-1 w-full">
				{label && (
					<label className="text-sm font-medium text-gray-700">{label}</label>
				)}
				<textarea
					ref={ref}
					className={cn(
						"w-full min-h-[100px] rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all",
						error && "border-red-500 focus:ring-red-500",
						className
					)}
					{...props}
				/>
				{error && <p className="text-sm text-red-600">{error}</p>}
			</div>
		);
	}
);

Textarea.displayName = "Textarea";

export { Textarea };
