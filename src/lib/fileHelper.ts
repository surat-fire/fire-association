import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export async function saveFile(file: File, folder = "events"): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return `/uploads/${folder}/${fileName}`;
}

export async function deleteFile(filePath?: string | null): Promise<void> {
  if (!filePath) return;
  try {
    const absolutePath = path.join(process.cwd(), "public", filePath);
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}
