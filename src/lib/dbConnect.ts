import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in environment variables');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'financevisualizer',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    }).then(mongoose => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch(err => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};