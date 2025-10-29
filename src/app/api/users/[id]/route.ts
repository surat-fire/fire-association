import { deleteFile, saveFile } from "@/lib/fileHelper";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const existing = await User.findById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    const formData = await req.formData();

    const name = formData.get("name");
    const role = formData.get("role");

    // Handle image
    let imagePath = existing.image;
    const imageFile = formData.get("imageFile") as File | null;
    if (imageFile && imageFile.size > 0) {
      await deleteFile(existing.image);
      imagePath = await saveFile(imageFile, "users");
    }

    const updated = await User.findByIdAndUpdate(
      id,
      {
        name,
        role,
        imageFile: imagePath,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    if (user.imageFile) await deleteFile(user.imageFile);

    const deletedData = await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
      data: deletedData,
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
