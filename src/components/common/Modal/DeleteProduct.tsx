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
      <p className="text-lg">
        Are you sure you want to delete{" "}
        <span className="font-bold">{productName}</span>?
      </p>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </CustomModal>
  );
};

export default DeleteProductModal;
