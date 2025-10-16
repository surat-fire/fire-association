import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  author: string;
  tags: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  featuredImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  author: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Set publishedAt when status changes to published
BlogSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
