import { useState } from "react";
import { useAppDispatch } from "../../hooks/auth";
import { deleteProduct } from "../../redux/products/operations";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import DeleteProductModal from "./Modal/DeleteProductModal";

const ProductItem = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (product.id !== null) {
      await dispatch(deleteProduct(product.id));
      setIsModalOpen(false);
    } else {
      console.error("Cannot delete product with null ID");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 transition-transform transform hover:scale-105 hover:shadow-lg">
      <p className="text-xl font-bold text-gray-800 truncate">{product.name}</p>
      <div className="my-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          See details...
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>

      <DeleteProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        productName={product.name}
      />
    </div>
  );
};

export default ProductItem;
