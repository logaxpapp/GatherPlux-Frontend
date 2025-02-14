import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { EventCategory } from "@/app/admin/categories/page";

interface NewCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: EventCategory) => void;
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSave = () => {
    if (categoryName.trim() && description.trim()) {
      onSave({
        name: categoryName,
        description,
        archived: status === "Inactive",
      });
      setCategoryName("");
      setDescription("");
      setStatus("Active");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="rounded-lg">
      <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
        <FaCheckCircle className="text-green-500 mr-2" />
        New Category
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          fullWidth
          variant="outlined"
          className="mt-4"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          className="mt-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter category description"
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </DialogContent>
      <DialogActions className="p-4 flex justify-end">
        <Button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaTimesCircle className="mr-2" />
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600/25"
        >
          <FaCheckCircle className="mr-2" />
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCategoryModal;
