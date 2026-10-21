import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var techspaceMongooseCache: MongooseCache | undefined;
}

const cached = globalThis.techspaceMongooseCache ?? {
  connection: null,
  promise: null,
};

globalThis.techspaceMongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error("Missing MONGODB_URI in Replit Secrets.");
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
