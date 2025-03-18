export interface Product {
  id: string | null;
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
  id: string;
  productId: string | null;
  description: string;
  date: string;
}
