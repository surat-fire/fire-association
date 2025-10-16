import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { generateResetToken } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent.',
      });
    }

    if (!admin.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Update admin with reset token
    await Admin.findByIdAndUpdate(admin._id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    });

    // Send email with reset link
    try {
      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset-password?token=${resetToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: admin.email,
        subject: 'Password Reset Request - Fire Safety Admin',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Password Reset Request</h2>
            <p>Hello ${admin.name},</p>
            <p>You have requested to reset your password for the Fire Safety Admin Panel.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
              Reset Password
            </a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Fire Safety Association<br>
              This is an automated message, please do not reply.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Still return success to not reveal email sending issues
    }

    return NextResponse.json({
      success: true,
      message: 'If the email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
