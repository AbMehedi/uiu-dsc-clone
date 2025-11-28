import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Enable debug mode for mongoose
mongoose.set('debug', true);

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

console.log('🔍 Testing MongoDB connection...');
console.log(`🔗 Connection string: ${MONGODB_URI.replace(/:([^:]*?)@/, ':***@')}`); // Hide password in logs

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

// Test connection function
async function testConnection() {
  try {
    console.log('\n🔄 Attempting to connect to MongoDB...');
    
    const connection = await mongoose.connect(MONGODB_URI, options);
    
    console.log('\n✅ Successfully connected to MongoDB!');
    console.log(`   - Host: ${connection.connection.host}`);
    console.log(`   - Port: ${connection.connection.port}`);
    console.log(`   - Database: ${connection.connection.name}`);
    
    // List all collections in the database
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('\n📂 Collections in database:');
    collections.forEach((collection, index) => {
      console.log(`   ${index + 1}. ${collection.name}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ MongoDB connection error:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.log('\n🔧 Common solutions:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('2. Verify your MongoDB connection string');
      console.log('3. Check your internet connection');
      console.log('4. Make sure MongoDB Atlas cluster is running');
    }
    
    process.exit(1);
  }
}

// Run the test
testConnection();
