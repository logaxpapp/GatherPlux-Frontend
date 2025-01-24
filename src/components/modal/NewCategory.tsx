import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface NewCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: { name: string; description: string; archived: string }) => void;
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({ open, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');
  const categoryNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      categoryNameRef.current?.focus();
      setError('');
    }
  }, [open]);

  const handleSave = () => {
    if (!categoryName.trim() || !description.trim()) {
      setError('Both category name and description are required.');
      return;
    }
    onSave({ name: categoryName, description, archived:status });
    setCategoryName('');
    setDescription('');
    setStatus('Active');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title" className="text-xl font-bold text-gray-800 flex items-center">
        <FaCheckCircle className="text-green-500 mr-2" />
        New Category
      </DialogTitle>
      <DialogContent>
        <TextField
          inputRef={categoryNameRef}
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
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
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
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <FaCheckCircle className="mr-2" />
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCategoryModal;
