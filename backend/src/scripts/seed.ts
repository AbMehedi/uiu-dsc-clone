import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/database';
import { Admin } from '../models/Admin';
import { Event } from '../models/Event';
import { About } from '../models/About';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🌱 Starting database seeding...\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Admin.deleteMany({});
    // await Event.deleteMany({});
    // await About.deleteMany({});
    // console.log('🗑️  Cleared existing data\n');

    // 1. Create default admin user
    console.log('👤 Creating default admin user...');
    const adminEmail = 'admin@uiudsc.ac.bd';
    const adminPassword = 'admin123';
    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      // Admin.create will automatically hash the password via pre-save hook
      admin = await Admin.create({
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
        role: 'admin',
      });
      console.log('✅ Admin created:', admin.email);
    } else {
      console.log('⚠️  Admin already exists:', admin.email);
    }

    // 2. Create sample events
    console.log('📅 Creating sample events...');
    const existingEvents = await Event.countDocuments();
    
    if (existingEvents > 0) {
      console.log('⚠️  Events already exist, skipping...\n');
    } else {
      const events = await Event.insertMany([
        {
          title: 'Data Science Workshop',
          description: 'Learn the fundamentals of data science, including data cleaning, analysis, and visualization techniques.',
          date: new Date('2025-12-15'),
          time: '10:00 AM',
          location: 'UIU Campus, Room 501',
          status: 'upcoming',
          registrationLink: 'https://forms.google.com/example',
        },
        {
          title: 'Machine Learning Bootcamp',
          description: 'Intensive bootcamp covering supervised and unsupervised learning algorithms with hands-on projects.',
          date: new Date('2025-12-20'),
          time: '2:00 PM',
          location: 'UIU Campus, Lab 302',
          status: 'upcoming',
          registrationLink: 'https://forms.google.com/example',
        },
        {
          title: 'Python for Data Analysis',
          description: 'Introduction to Python programming for data analysis using pandas, numpy, and matplotlib.',
          date: new Date('2025-11-30'),
          time: '3:00 PM',
          location: 'Online',
          status: 'completed',
        },
      ]);
      console.log(`✅ Created ${events.length} sample events\n`);
    }

    // 3. Create sample about content
    console.log('ℹ️  Creating about content...');
    const existingAbout = await About.findOne();
    
    if (existingAbout) {
      console.log('⚠️  About content already exists, skipping...\n');
    } else {
      const about = await About.create({
        sections: [
          {
            title: 'Community',
            description: 'Join a vibrant community of data enthusiasts, share knowledge, and collaborate on exciting projects.',
            icon: '👥',
          },
          {
            title: 'Learning',
            description: 'Access workshops, seminars, and hands-on training sessions led by industry experts and faculty members.',
            icon: '📚',
          },
          {
            title: 'Opportunities',
            description: 'Participate in competitions, hackathons, and research projects to enhance your skills and portfolio.',
            icon: '💼',
          },
        ],
        mission: 'To promote data science education, research, and applications among students at United International University, fostering innovation and building a community of future data leaders.',
        vision: 'To become a leading student organization in data science education and innovation, empowering students with the skills and knowledge needed to excel in the data-driven world.',
      });
      console.log('✅ About content created\n');
    }

    console.log('✨ Database seeding completed successfully!');
    console.log('\n📝 Default credentials:');
    console.log('   Email: admin@uiudsc.ac.bd');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the default password after first login!');

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run seed function
seedDatabase();




