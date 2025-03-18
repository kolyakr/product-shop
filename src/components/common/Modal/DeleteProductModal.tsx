import CustomModal from "./CustomModal";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <p className="text-lg text-gray-700">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-red-600">{productName}</span>?
      </p>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </CustomModal>
  );
};

export default DeleteProductModal;
