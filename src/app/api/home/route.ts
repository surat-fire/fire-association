import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const [event, blog] = await Promise.all([
      Event.findOne().sort({ date: -1 }),
      Blog.findOne({ isFeatured: true }).sort({ createdAt: -1 }),
    ]);
    return NextResponse.json({
      event,
      blog,
    });
  } catch (error: any) {
    console.error("Error fetching home data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
