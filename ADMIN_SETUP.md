# Admin Panel Setup Guide

This guide will help you set up the admin panel for the Fire Safety Association website.

## Prerequisites

1. MongoDB Atlas account and cluster
2. Email service (Gmail recommended for development)
3. Node.js and npm installed

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/fire-safety?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the "Connect" button
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `fire-safety`

### Getting Gmail App Password

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASS`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create the super admin user:
```bash
node scripts/create-super-admin.js
```

This will create a super admin with:
- Email: `admin@fire-safety.com`
- Password: `admin123`
- Role: `super_admin`

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/admin/login`

3. Login with the super admin credentials:
   - Email: `admin@fire-safety.com`
   - Password: `admin123`

## Admin Panel Features

### Authentication
- ✅ Admin login with JWT tokens
- ✅ Forgot password functionality
- ✅ Password reset via email
- ✅ Protected routes with middleware
- ✅ Role-based access control

### Admin Dashboard
- ✅ Overview statistics
- ✅ Recent activities
- ✅ Quick action buttons
- ✅ Responsive sidebar navigation

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify-token` - Verify JWT token

#### Admin Management
- `POST /api/admin/create-super-admin` - Create super admin (one-time use)

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Tokens**: Secure authentication with 7-day expiration
3. **Email Verification**: Password reset requires email verification
4. **Role-based Access**: Different permission levels for admin types
5. **Protected Routes**: Middleware protection for admin routes
6. **Input Validation**: Server-side validation for all inputs

## File Structure

```
src/
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── login/            # Login page
│   │   ├── forgot-password/  # Forgot password page
│   │   ├── reset-password/   # Reset password page
│   │   └── layout.tsx        # Admin layout with auth
│   └── api/
│       ├── auth/             # Authentication APIs
│       └── admin/            # Admin management APIs
├── components/
│   └── admin/                # Admin-specific components
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── auth-middleware.ts   # Auth middleware helpers
│   └── mongodb.ts           # Database connection
├── models/
│   └── Admin.ts             # Admin user model
└── middleware.ts            # Next.js middleware
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MONGO_URI in `.env.local`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify your database user has proper permissions

2. **Email Not Sending**
   - Check your Gmail app password
   - Ensure 2FA is enabled on your Gmail account
   - Verify EMAIL_HOST and EMAIL_PORT settings

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET is set
   - Verify token expiration

### Development Tips

1. **Creating Additional Admins**
   - Use the super admin account to create regular admins
   - Or modify the create-super-admin script for different credentials

2. **Testing Email Functionality**
   - Use a test email service like Mailtrap for development
   - Or use your personal Gmail with app passwords

3. **Database Management**
   - Use MongoDB Compass for visual database management
   - Or use the MongoDB Atlas web interface

## Production Deployment

1. **Environment Variables**
   - Set all environment variables in your hosting platform
   - Use strong, unique JWT secrets
   - Use production email service

2. **Security**
   - Change default super admin credentials
   - Use HTTPS in production
   - Set up proper CORS policies
   - Enable rate limiting

3. **Database**
   - Use MongoDB Atlas production cluster
   - Set up proper backup strategies
   - Monitor database performance

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
