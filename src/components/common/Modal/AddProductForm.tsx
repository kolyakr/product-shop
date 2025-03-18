import { useForm } from "react-hook-form";
import { Product } from "../../../types";
import CustomModal from "./CustomModal";

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, "id">) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Product, "id">>();

  const handleFormSubmit = (data: Omit<Product, "id">) => {
    onSubmit(data);
    reset();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <input
          {...register("imageUrl", { required: "Image URL is required" })}
          placeholder="Image URL"
        />
        {errors.imageUrl && (
          <span className="text-red-500">{errors.imageUrl.message}</span>
        )}

        <input
          type="number"
          {...register("count", { required: "Count is required", min: 1 })}
          placeholder="Count"
        />
        {errors.count && (
          <span className="text-red-500">{errors.count.message}</span>
        )}

        <input
          type="number"
          {...register("size.width", { required: "Width is required", min: 1 })}
          placeholder="Width"
        />
        {errors.size?.width && (
          <span className="text-red-500">{errors.size.width.message}</span>
        )}

        <input
          type="number"
          {...register("size.height", {
            required: "Height is required",
            min: 1,
          })}
          placeholder="Height"
        />
        {errors.size?.height && (
          <span className="text-red-500">{errors.size.height.message}</span>
        )}

        <input
          {...register("weight", { required: "Weight is required" })}
          placeholder="Weight"
        />
        {errors.weight && (
          <span className="text-red-500">{errors.weight.message}</span>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
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

export default AddProductForm;
