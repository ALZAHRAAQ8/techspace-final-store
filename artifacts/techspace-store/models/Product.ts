import mongoose, { type Model } from "mongoose";

export interface ProductRecord {
  handle: string;
  name: string;
  nameAr: string;
  description: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  createdAt: Date;
}

const ProductSchema = new mongoose.Schema<ProductRecord>(
  {
    handle: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameAr: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const Product =
  (mongoose.models.Product as Model<ProductRecord> | undefined) ??
  mongoose.model<ProductRecord>("Product", ProductSchema);
