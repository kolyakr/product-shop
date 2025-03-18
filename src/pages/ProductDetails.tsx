import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/auth";
import { selectSelectedProduct } from "../redux/products/selectors";
import { getProductById, updateProduct } from "../redux/products/operations";
import Comments from "../components/Comments";
import { Product } from "../types";
import UpdateProductFormModal from "../components/common/Modal/UpdateProductFormModal";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  const product = useAppSelector(selectSelectedProduct);
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const handleUpdate = (updatedData: Partial<Product>) => {
    if (id) {
      dispatch(updateProduct({ product: updatedData, id }));
      setIsEditOpen(false);
    }
  };

  if (!isLoading && !product) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 text-lg font-medium">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-start">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="w-full md:w-64 h-64 object-cover rounded-lg shadow-md"
            />
            <div className="md:ml-6 mt-4 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-800">
                {product?.name}
              </h2>
              <p className="mt-2 text-gray-600">
                <span className="font-semibold">Weight:</span> {product?.weight}
              </p>
              <p className="mt-2 text-gray-600">
                <span className="font-semibold">Count:</span> {product?.count}
              </p>
              <p className="mt-2 text-gray-600">
                <span className="font-semibold">Size:</span>{" "}
                {`${String(product?.size.width)} x ${String(
                  product?.size.height
                )}`}
              </p>

              <button
                onClick={() => setIsEditOpen(true)}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition duration-200"
              >
                Edit Product
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Comments
            </h3>
            {id && <Comments productId={id} />}
          </div>
        </>
      )}

      <UpdateProductFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdate}
        product={product}
      />
    </div>
  );
};

export default ProductDetails;
