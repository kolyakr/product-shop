import { useEffect, useState } from "react";
import { getProducts, addProduct } from "../redux/products/operations";
import { useAppDispatch, useAppSelector } from "../hooks/auth";
import { selectProducts } from "../redux/products/selectors";
import ProductItem from "../components/common/ProductItem";
import AddProductForm from "../components/common/Modal/AddProductForm";
import { Product } from "../types";

type SortOption = "alphabetical" | "count" | "alphabeticalCount";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>("alphabeticalCount");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useAppSelector(selectProducts);

  const handleAddProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      comments: [],
    };

    dispatch(addProduct(newProduct));
    setIsOpen(false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "count") {
      return a.count - b.count;
    } else {
      const nameComparison = a.name.localeCompare(b.name);
      return nameComparison !== 0 ? nameComparison : a.count - b.count;
    }
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-200"
          onClick={() => setIsOpen(true)}
        >
          Add Product
        </button>

        <div className="flex items-center">
          <label
            htmlFor="sort"
            className="mr-2 text-lg font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="count">Count</option>
            <option value="alphabeticalCount">Alphabetical & Count</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No products available.
        </p>
      )}

      <AddProductForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;
