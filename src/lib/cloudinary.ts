import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload (File object from FormData)
 * @param folder - The folder path in Cloudinary (e.g., "users", "events", "blogs")
 * @param resourceType - The resource type: "image" or "raw" (for PDFs, etc.)
 * @returns The secure URL of the uploaded file
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = 'misc',
  resourceType: 'image' | 'raw' = 'image'
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to stream
    const stream = Readable.from(buffer);

    // Generate unique public_id
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    const publicId = `${folder}/${timestamp}-${sanitizedName}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          public_id: publicId.split('.')[0], // Remove extension for public_id
          resource_type: resourceType,
          overwrite: false,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed: No result returned'));
          }
        }
      );

      stream.pipe(uploadStream);
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

/**
 * Delete a file from Cloudinary using its URL
 * @param url - The Cloudinary URL of the file to delete
 * @returns Promise that resolves when deletion is complete
 */
export async function deleteFromCloudinary(url?: string | null): Promise<void> {
  if (!url) return;

  try {
    // Check if it's a Cloudinary URL
    if (!url.includes('cloudinary.com')) {
      // If it's not a Cloudinary URL (might be old local path), just return
      console.warn('Not a Cloudinary URL, skipping deletion:', url);
      return;
    }

    // Extract public_id from Cloudinary URL
    // Cloudinary URLs format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{version}/{public_id}.{format}
    // or: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{public_id}.{format}
    const urlMatch = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    
    if (!urlMatch) {
      console.warn('Could not extract public_id from Cloudinary URL:', url);
      return;
    }

    const publicId = urlMatch[1];
    
    // Determine resource type from URL
    const resourceType = url.includes('/image/') ? 'image' : 
                         url.includes('/raw/') ? 'raw' : 
                         url.includes('/video/') ? 'video' : 'image';

    // Remove folder prefix if it exists in the public_id (Cloudinary includes it in the URL)
    // The public_id should be the full path including folder
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    // Don't throw - deletion failures shouldn't break the flow
  }
}

/**
 * Helper function to determine resource type based on file type
 */
export function getResourceType(file: File): 'image' | 'raw' {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  return imageTypes.includes(file.type) ? 'image' : 'raw';
}

