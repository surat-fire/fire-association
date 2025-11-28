import { uploadToCloudinary, deleteFromCloudinary, getResourceType } from "./cloudinary";

/**
 * Save a file to Cloudinary cloud storage
 * @param file - The file to upload
 * @param folder - The folder name in Cloudinary (e.g., "users", "events", "blogs")
 * @returns The secure URL of the uploaded file
 */
export async function saveFile(file: File, folder = "events"): Promise<string> {
  const resourceType = getResourceType(file);
  return await uploadToCloudinary(file, folder, resourceType);
}

/**
 * Delete a file from Cloudinary cloud storage
 * @param fileUrl - The Cloudinary URL of the file to delete
 */
export async function deleteFile(fileUrl?: string | null): Promise<void> {
  await deleteFromCloudinary(fileUrl);
}
