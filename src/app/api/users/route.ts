import { saveFile } from "@/lib/fileHelper";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    const name = formData.get("name");
    const role = formData.get("role");

    let imagePath = "";
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      imagePath = await saveFile(imageFile, "users");
    }

    const user = await User.create({
      name,
      role,
      imageFile: imagePath,
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      error: error.message,
    });
  }
}
