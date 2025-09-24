import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 100,   
      minPoolSize: 10,    
      serverSelectionTimeoutMS: 5000, 
    });

    console.log("✅ MongoDB connected with connection pooling (maxPoolSize=100)");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDb;
