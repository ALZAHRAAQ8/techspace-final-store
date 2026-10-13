import mongoose, { Types, type Model } from "mongoose";

export interface OrderItemRecord {
  product: Types.ObjectId;
  productId: string;
  name: string;
  nameAr: string;
  quantity: number;
  price: number;
}

export interface OrderRecord {
  user: Types.ObjectId;
  items: OrderItemRecord[];
  total: number;
  currency: "KWD";
  status: "pending" | "paid";
  createdAt: Date;
}

const OrderItemSchema = new mongoose.Schema<OrderItemRecord>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const OrderSchema = new mongoose.Schema<OrderRecord>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["KWD"],
      default: "KWD",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
      required: true,
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

export const Order =
  (mongoose.models.Order as Model<OrderRecord> | undefined) ??
  mongoose.model<OrderRecord>("Order", OrderSchema);
