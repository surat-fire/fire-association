"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Calendar, Clock, User, Tag, FileText, Loader2, Eye } from 'lucide-react';
import { apiRequest } from '@/lib/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  status: 'draft' | 'published';
  author: string;
  tags: string[];
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await apiRequest(`/api/blogs/${params.id}`);
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
        alert('Failed to fetch blog');
        router.push('/admin/blogs');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-800 animate-spin" />
          <span className="text-lg text-gray-600 font-medium">Loading blog...</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/blogs"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Blog Post Details</h1>
                <p className="text-white/80 text-sm mt-1">
                  View and manage your blog post
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/blogs/${blog._id}/edit`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-brand-800 rounded-lg hover:bg-white/90 transition-colors font-medium shadow-md"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Featured Image & Title Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {blog.featuredImage && (
              <div className="relative h-80 w-full">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${blog.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {blog.status === 'published' ? (
                    <Eye className="w-4 h-4 mr-1.5" />
                  ) : (
                    <FileText className="w-4 h-4 mr-1.5" />
                  )}
                  {blog.status}
                </span>
                {blog.isFeatured && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-brand-800 text-white">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="p-2 bg-brand-800/10 rounded-lg">
                    <User className="w-4 h-4 text-brand-800" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Author</p>
                    <p className="font-medium text-gray-900">{blog.author}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <div className="p-2 bg-brand-800/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-brand-800" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="font-medium text-gray-900">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>

                {blog.publishedAt && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="p-2 bg-brand-800/10 rounded-lg">
                      <Clock className="w-4 h-4 text-brand-800" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Published</p>
                      <p className="font-medium text-gray-900">{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Excerpt Card */}
          {blog.excerpt && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-brand-800" />
                <h3 className="text-lg font-semibold text-brand-800">Excerpt</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{blog.excerpt}</p>
            </div>
          )}

          {/* Tags Card */}
          {blog.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-brand-800" />
                <h3 className="text-lg font-semibold text-brand-800">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-brand-800 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-brand-800" />
              <h3 className="text-lg font-semibold text-brand-800">Content</h3>
            </div>
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-800 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Blog Information Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-brand-800 mb-6">Blog Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(blog.updatedAt)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Blog ID</p>
                <p className="text-sm font-medium text-gray-900 font-mono truncate">{blog._id}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Word Count</p>
                <p className="text-sm font-medium text-gray-900">
                  {blog.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length} words
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}