import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../../types";
import CustomModal from "./CustomModal";

interface UpdateProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
  product: Product | null;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
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
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <input {...register("name")} placeholder="Name" />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <input {...register("imageUrl")} placeholder="Image URL" />
        {errors.imageUrl && (
          <span className="text-red-500">{errors.imageUrl.message}</span>
        )}

        <input type="number" {...register("count")} placeholder="Count" />
        {errors.count && (
          <span className="text-red-500">{errors.count.message}</span>
        )}

        <input type="number" {...register("size.width")} placeholder="Width" />
        {errors.size?.width && (
          <span className="text-red-500">{errors.size.width.message}</span>
        )}

        <input
          type="number"
          {...register("size.height")}
          placeholder="Height"
        />
        {errors.size?.height && (
          <span className="text-red-500">{errors.size.height.message}</span>
        )}

        <input {...register("weight")} placeholder="Weight" />
        {errors.weight && (
          <span className="text-red-500">{errors.weight.message}</span>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default UpdateProductForm;
