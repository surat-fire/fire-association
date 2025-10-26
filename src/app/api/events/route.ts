import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { saveFile } from "@/lib/fileHelper";
import connectDB from "@/lib/mongodb";

// 🧾 GET all events
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json({ success: true, data: events });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ➕ POST create event (supports FormData)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    // Extract fields
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    const location = formData.get("location");
    const eventType = formData.get("eventType") || "Drill";
    const agenda = JSON.parse((formData.get("agenda") as string) || "[]");
    const trainers = JSON.parse((formData.get("trainers") as string) || "[]");

    let imagePath = "";
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size > 0) {
      imagePath = await saveFile(imageFile, "events");
    }

    let safetyChecklistPath = "";
    const safetyChecklistFile = formData.get("safetyChecklistUrl") as File;
    if (safetyChecklistFile && safetyChecklistFile.size > 0) {
      safetyChecklistPath = await saveFile(safetyChecklistFile, "events");
    }

    const event = await Event.create({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      eventType,
      agenda,
      trainers,
      safetyChecklistUrl: safetyChecklistPath,
      image: imagePath,
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
