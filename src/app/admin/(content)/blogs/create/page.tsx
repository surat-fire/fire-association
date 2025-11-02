"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { X, Upload, Loader2, ArrowLeft, Save, Eye } from 'lucide-react';
import { apiRequest, apiRequestWithFormData } from '@/lib/api';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  status: 'draft' | 'published';
  tags: string;
  isFeatured: boolean;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'draft',
    tags: '',
    isFeatured: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size too large. Maximum size is 5MB.');
      return;
    }

    setImageUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const result = await apiRequestWithFormData('/api/blogs/upload', uploadData);
      setFormData(prev => ({
        ...prev,
        featuredImage: result.url
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: e.target.checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const blog = await apiRequest('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        })
      });

      router.push(`/admin/blogs/${blog._id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Create New Blog Post</h1>
                <p className="text-white/80 text-sm mt-1">
                  Write and publish content for your fire safety association
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label htmlFor="title" className="block text-sm font-semibold text-brand-800 mb-3">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all"
              placeholder="Enter an engaging title for your blog post..."
            />
          </div>

          {/* Featured Image Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-brand-800 mb-3">
              Featured Image
            </label>

            {formData.featuredImage ? (
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={formData.featuredImage}
                  width={800}
                  height={400}
                  alt="Featured"
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                  className="absolute top-3 right-3 bg-brand-800 text-white rounded-full p-2 hover:bg-brand-800/90 shadow-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-800 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-800 text-white rounded-lg hover:bg-brand-800/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {imageUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Featured Image
                    </>
                  )}
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  JPEG, PNG, or WebP • Maximum 5MB
                </p>
              </div>
            )}
          </div>

          {/* Excerpt Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label htmlFor="excerpt" className="block text-sm font-semibold text-brand-800 mb-3">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all resize-none"
              placeholder="Write a brief summary of your blog post..."
            />
            <p className="mt-2 text-sm text-gray-500">
              A short description that will appear in blog listings
            </p>
          </div>

          {/* Content Editor Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-brand-800 mb-3">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-800 focus-within:border-transparent transition-all">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                placeholder="Start writing your blog content here..."
                className="bg-white"
              />
            </div>
          </div>

          {/* Tags and Settings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tags */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <label htmlFor="tags" className="block text-sm font-semibold text-brand-800 mb-3">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all"
                placeholder="fire safety, training, emergency"
              />
              <p className="mt-2 text-sm text-gray-500">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <label htmlFor="status" className="block text-sm font-semibold text-brand-800 mb-3">
                Publication Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Now</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                {formData.status === 'draft' ? 'Save without publishing' : 'Make live immediately'}
              </p>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="isFeatured" className="block text-sm font-semibold text-brand-800 mb-1">
                  Featured Post
                </label>
                <p className="text-sm text-gray-500">
                  Highlight this post on your homepage and listings
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={handleCheckboxChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-800/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-800"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-brand-800 text-white rounded-lg font-medium hover:bg-brand-800/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    {formData.status === 'published' ? <Eye className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {formData.status === 'published' ? 'Publish Blog Post' : 'Save as Draft'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}