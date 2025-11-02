import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import EventRegistration from "@/models/EventRegistration";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { event, fullName, organization, phone, email } = body;

    if (!event || !fullName || !email) {
      return NextResponse.json(
        { error: "Event ID, fullName, and email are required." },
        { status: 400 }
      );
    }

    const registration = await EventRegistration.create({
      event,
      fullName,
      organization,
      phone,
      email,
    });

    return NextResponse.json({ success: true, data: registration });
  } catch (error: any) {
    console.error("Error creating registration:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
