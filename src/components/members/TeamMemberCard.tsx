"use client"

import { IUser } from "@/models/User";
import Image from "next/image";
import { useState } from "react";

const TeamMemberCard = ({ member, key }: { member: IUser, key: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={key}
            className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ aspectRatio: '3/4' }}
        >
            {/* Image */}
            <div className="relative w-full h-full">
                <Image
                    src={member.imageFile}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Overlay with name and role */}
            <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-200">{member.role}</p>
                </div>
            </div>

            {/* Alternative: Always visible overlay (like in your first image) */}
            {/* Uncomment this section if you want the overlay always visible */}
            {/*
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-sm text-gray-200">{member.role}</p>
          </div>
        </div>
        */}
        </div>
    );
}

export default TeamMemberCard