// eslint-disable-next-line @typescript-eslint/no-require-imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
const { Schema, models, model, connect, disconnect } = mongoose;
import { hash } from 'bcryptjs';

// Admin Schema
const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin'],
    default: 'admin',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Admin = models.Admin || model('Admin', AdminSchema);

async function createSuperAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/fire-safety';
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoUri ? 'Set (hidden for security)' : 'Not set');

    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI environment variable is not set!');
      console.log('Please create a .env.local file with your MongoDB connection string.');
      process.exit(1);
    }

    await connect(mongoUri);
    console.log('Connected to MongoDB successfully');

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      process.exit(0);
    }

    // Create super admin
    const superAdminData = {
      email: 'thesuratfireassociation.in@gmail.com',
      password: await hash('admin@123', 12),
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    };

    const superAdmin = new Admin(superAdminData);
    await superAdmin.save();

    console.log('Super admin created successfully!');
    console.log('Email:', superAdmin.email);
    console.log('Password: admin@123');
    console.log('Role:', superAdmin.role);

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await disconnect();
    process.exit(0);
  }
}

// Run the script
createSuperAdmin();
