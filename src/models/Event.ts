import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  image: string;
  subject: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  venue: string;
  details: string; // Rich text HTML content
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  image: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: 'Date must be in YYYY-MM-DD format'
    }
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Time must be in HH:mm format'
    }
  },
  venue: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  details: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Add virtual for formatted date and time
EventSchema.virtual('formattedDateTime').get(function() {
  const eventDate = new Date(this.date);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return `${eventDate.toLocaleDateString('en-US', options)} at ${this.time}`;
});

// Ensure virtual fields are serialized
EventSchema.set('toJSON', { virtuals: true });
EventSchema.set('toObject', { virtuals: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
