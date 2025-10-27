import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { saveFile, deleteFile } from "@/lib/fileHelper";
import connectDB from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const event = await Event.findById(id);
    if (!event)
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: event });
  } catch (error: any) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✏️ UPDATE (PUT)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const existing = await Event.findById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );

    const formData = await req.formData();

    // Extract core fields
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    const location = formData.get("location");
    const eventType = formData.get("eventType");
    const agenda = JSON.parse((formData.get("agenda") as string) || "[]");
    const trainers = JSON.parse((formData.get("trainers") as string) || "[]");

    // Handle image
    let imagePath = existing.image;
    const imageFile = formData.get("image") as File | null;
    console.log("imageFile ======>", imageFile)
    if (imageFile && imageFile.size > 0) {
      console.log("in condition")
      await deleteFile(existing.image);
      imagePath = await saveFile(imageFile, "events");
      console.log("imagePath ======>", imagePath)
    }

    // Handle safety checklist doc
    let safetyChecklistPath = existing.safetyChecklistUrl;
    const checklistFile = formData.get("safetyChecklist") as File | null;
    if (checklistFile && checklistFile.size > 0) {
      await deleteFile(existing.safetyChecklistUrl);
      safetyChecklistPath = await saveFile(checklistFile, "events");
    }

    const updated = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        eventType,
        agenda,
        trainers,
        image: imagePath,
        safetyChecklistUrl: safetyChecklistPath,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 🗑️ DELETE event (also deletes uploaded files)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const event = await Event.findById(id);
    if (!event)
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );

    // Delete files
    if (event.image) await deleteFile(event.image);
    if (event.safetyChecklistUrl) await deleteFile(event.safetyChecklistUrl);

    await Event.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
