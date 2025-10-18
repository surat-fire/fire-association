import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

// GET /api/events - Get all events with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } },
        { details: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    if (sortBy === 'date') {
      sort.date = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'createdAt') {
      sort.createdAt = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    
    const events = await Event.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await Event.countDocuments(filter);
    
    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const body = await request.json();
    const { image, subject, date, time, venue, details } = body;
    
    // Validation
    if (!image || !subject || !date || !time || !venue || !details) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, error: 'Date must be in YYYY-MM-DD format' },
        { status: 400 }
      );
    }
    
    // Validate time format
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
      return NextResponse.json(
        { success: false, error: 'Time must be in HH:mm format' },
        { status: 400 }
      );
    }
    
    const event = new Event({
      image,
      subject,
      date,
      time,
      venue,
      details
    });
    
    await event.save();
    
    return NextResponse.json({
      success: true,
      data: event,
      message: 'Event created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
