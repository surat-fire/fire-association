"use client";

import React from "react";
import { IEvent } from "@/types/event";
import Card from "./ui/Card";
import { Button } from "./ui/Button";
import Image from "next/image";

interface EventCardProps {
    event: IEvent;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => (
    <Card>
        {event.image && (
            <Image
                src={event.image as string}
                alt={event.title}
                width={100}
                height={100}
                className="w-full h-40 object-cover rounded-lg mb-3"
            />
        )}
        <h3 className="text-[#490c0c] text-lg font-bold">{event.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{event.location}</p>
        <p className="text-gray-500 text-sm">
            {new Date(event.date).toLocaleDateString()} • {event.startTime}–{event.endTime}
        </p>

        {(onEdit || onDelete) && (
            <div className="flex justify-end gap-2 mt-4">
                {onEdit && <Button onClick={() => onEdit(event._id!)}>Edit</Button>}
                {onDelete && <Button onClick={() => onDelete(event._id!)}>Delete</Button>}
            </div>
        )}
    </Card>
);

export default EventCard;