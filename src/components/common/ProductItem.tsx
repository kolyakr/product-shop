import React from "react";
import { Product } from "../../types";

const ProductItem = ({ product }: { product: Product }) => {
  return <div>{product.name}</div>;
};

export default ProductItem;
