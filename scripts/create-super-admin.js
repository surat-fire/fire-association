require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin Schema
const AdminSchema = new mongoose.Schema({
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

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

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
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully');

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      process.exit(0);
    }

    // Create super admin
    const superAdminData = {
      email: 'admin@fire-safety.com',
      password: await bcrypt.hash('admin123', 12),
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    };

    const superAdmin = new Admin(superAdminData);
    await superAdmin.save();

    console.log('Super admin created successfully!');
    console.log('Email:', superAdmin.email);
    console.log('Password: admin123');
    console.log('Role:', superAdmin.role);

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Run the script
createSuperAdmin();
