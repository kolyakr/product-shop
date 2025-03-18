export interface Product {
  id: number | null;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: number[];
}

export interface Comment {
  id: number | null;
  productId: number | null;
  description: string;
  date: string;
}
