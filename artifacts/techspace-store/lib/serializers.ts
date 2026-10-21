import type {
  Order,
  OrderItem,
  Product,
  PublicUser,
} from "@workspace/api-client-react";

type UserDocumentLike = {
  _id: { toString(): string };
  name: string;
  email: string;
  createdAt: Date;
};

type ProductDocumentLike = {
  _id: { toString(): string };
  name: string;
  nameAr: string;
  description: string;
  category: string;
  price: number;
  image: string;
  tag?: string | null;
  createdAt: Date;
};

type OrderDocumentLike = {
  _id: { toString(): string };
  items: Array<{
    productId: string;
    name: string;
    nameAr: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  currency: "KWD" | "USD";
  status: "pending" | "paid";
  createdAt: Date;
};

export function serializeUser(user: UserDocumentLike): PublicUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}

export function serializeProduct(product: ProductDocumentLike): Product {
  return {
    id: product._id.toString(),
    name: product.name,
    nameAr: product.nameAr,
    description: product.description,
    category: product.category,
    price: Number(product.price),
    image: product.image,
    tag: product.tag ?? null,
    createdAt: product.createdAt.toISOString(),
  };
}

export function serializeOrder(order: OrderDocumentLike): Order {
  const items: OrderItem[] = order.items.map((item) => ({
    productId: item.productId,
    name: item.name,
    nameAr: item.nameAr,
    quantity: item.quantity,
    price: Number(item.price),
  }));

  return {
    id: order._id.toString(),
    items,
    total: Number(order.total),
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  };
}
