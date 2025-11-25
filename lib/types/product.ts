export type Product = {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  campusId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  locationId: string | null;
  categoryId: number;
  images: {
    id: string;
    url: string;
    productId: string;
  }[];
  seller: {
    id: string;
    name: string;
    // ...
  };
  campus: {
    id: string;
    name: string;
  };
};
