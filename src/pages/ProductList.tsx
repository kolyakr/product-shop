import React, { useEffect } from "react";
import { getProducts } from "../redux/products/operations";
import { useAppDispatch, useAppSelector } from "../hooks/auth";
import { selectProducts } from "../redux/products/selectors";
import ProductItem from "../components/common/ProductItem";

const ProductList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
    };

    fetchProducts();
  }, [dispatch]);

  const products = useAppSelector(selectProducts);

  return (
    <ul>
      {products && Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))
      ) : (
        <p>Product list is empty</p>
      )}
    </ul>
  );
};

export default ProductList;
