'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Event Image',
  error,
  className
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/events/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.imagePath);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      
      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Choose Image'}
          </Button>
          
          {value && (
            <Button
              type="button"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              Remove
            </Button>
          )}
        </div>
        
        {value && (
          <div className="mt-2">
            <Image
              src={value}
              alt="Event preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              Current image: {value.split('/').pop()}
            </p>
          </div>
        )}
        
        {(error || uploadError) && (
          <p className="text-sm text-red-600">
            {error || uploadError}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
