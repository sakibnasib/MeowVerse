import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { imageUpload } from '../../api/utils';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const EditCatFoodModal = ({ closeModal, food, isOpen }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const axiosSecure=useAxiosSecure()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: food?.name || '',
      brand: food?.brand || '',
      weight: food?.weight || '',
      quantity: food?.quantity || '',
      price: food?.price || '',
      category: food?.category || '',
      expiryDate: food?.expiryDate ? new Date(food.expiryDate) : null,
      description: food?.description || '',
      ingredients: food?.ingredients || '',
    },
  });

  const updateFoodMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/seller/foods/${food._id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cat-foods']);
       Swal.fire('Updated', 'Cat added successfully!', 'success')
      closeModal();
    },
    onError: (err) => {
      console.error(err);
      alert('Failed to update cat food');
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = food?.imageUrls?.[0] || '';
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      try {
        imageUrl = await imageUpload(file);
      } catch (err) {
        console.error('Image upload failed:', err);
        return alert('Image upload failed');
      }
    }

    const payload = {
      ...data,
      expiryDate: data.expiryDate?.toISOString(),
      imageUrls: [imageUrl],
    };
console.log(payload)
    updateFoodMutation.mutate(payload);
 
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={closeModal}>
      <div className="fixed inset-0  backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto flex items-center justify-center px-2 sm:px-4 py-10">
        <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-5 sm:p-8">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Edit Cat Food
          </DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'name', label: 'Product Name' },
                { name: 'brand', label: 'Brand' },
                { name: 'weight', label: 'Weight (kg)', type: 'number' },
                { name: 'quantity', label: 'Quantity', type: 'number' },
                { name: 'price', label: 'Price (BDT)', type: 'number' },
                { name: 'category', label: 'Category' },
              ].map(({ name, label, type = 'text' }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">{label}</label>
                  <input
                    {...register(name)}
                    type={type}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                  />
                </div>
              ))}

              {/* Expiry Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <DatePicker
                  selected={watch('expiryDate')}
                  onChange={(date) => setValue('expiryDate', date)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                  dateFormat="yyyy-MM-dd"
                showMonthDropdown
                showYearDropdown
                   minDate={ new Date()}
                    yearDropdownItemNumber={100}
                  placeholderText="Select a date"
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="mt-1 w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-orange-600 file:px-3 file:py-2 file:text-white hover:file:bg-orange-700"
                />
                {/* {food?.imageUrls?.[0] && (
                  <img
                    src={food.imageUrls[0]}
                    alt="Current"
                    className="mt-2 w-20 h-20 object-cover rounded border"
                  />
                )} */}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 shadow-sm"
              />
            </div>

            {/* Ingredients */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Ingredients</label>
              <textarea
                {...register('ingredients')}
                rows={2}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 shadow-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateFoodMutation.isLoading}
                className="rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700 transition disabled:opacity-50"
              >
                {updateFoodMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditCatFoodModal;
