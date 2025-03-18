import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../../types";
import CustomModal from "./CustomModal";

interface UpdateProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
  product: Product | null;
}

const UpdateProductFormModal: React.FC<UpdateProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<Product>>();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const handleFormSubmit = (data: Partial<Product>) => {
    onSubmit(data);
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Update Product">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Product Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input
          {...register("imageUrl", { required: "Image URL is required" })}
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
        )}

        <input
          type="number"
          {...register("count", { required: "Count is required", min: 1 })}
          placeholder="Count"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.count && (
          <p className="text-red-500 text-sm">{errors.count.message}</p>
        )}

        <div className="flex gap-4">
          <input
            type="number"
            {...register("size.width", {
              required: "Width is required",
              min: 1,
            })}
            placeholder="Width"
            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            {...register("size.height", {
              required: "Height is required",
              min: 1,
            })}
            placeholder="Height"
            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors.size?.width && (
          <p className="text-red-500 text-sm">
            Width: {errors.size.width.message}
          </p>
        )}
        {errors.size?.height && (
          <p className="text-red-500 text-sm">
            Height: {errors.size.height.message}
          </p>
        )}

        <input
          {...register("weight", { required: "Weight is required" })}
          placeholder="Weight (e.g., 500g, 1kg)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.weight && (
          <p className="text-red-500 text-sm">{errors.weight.message}</p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default UpdateProductFormModal;
