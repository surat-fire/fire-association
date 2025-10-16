import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      return NextResponse.json(
        { error: 'Super admin already exists' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create super admin
    const superAdmin = new Admin({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'super_admin',
      isActive: true,
    });

    await superAdmin.save();

    return NextResponse.json({
      success: true,
      message: 'Super admin created successfully',
      data: {
        id: superAdmin._id,
        email: superAdmin.email,
        name: superAdmin.name,
        role: superAdmin.role,
      },
    });
  } catch (error) {
    console.error('Create super admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
