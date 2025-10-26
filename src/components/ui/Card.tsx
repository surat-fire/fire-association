import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
        {children}
    </div>
)

export default Card;
