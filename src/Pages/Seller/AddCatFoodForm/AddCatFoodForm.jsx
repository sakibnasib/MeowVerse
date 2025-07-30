import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hook/useAuth';
import { imageUpload } from '../../../api/utils';
import Loaer from '../../../Components/Loaer/Loaer';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCatFoodForm = () => {
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm();

  const { data: sellerdata = {}, isLoading } = useQuery({
    queryKey: ['user'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/user/${user?.email}`);
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post('http://localhost:3000/catfoods', formData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Cat food added!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to add cat food.', 'error');
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image1[0];
      const imageUrl = await imageUpload(imageFile);

      const formData = {
        ...data,
        sellerName: user?.displayName || '',
        sellerEmail: user?.email || '',
        imageUrls: [imageUrl], // single image
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        weight: parseFloat(data.weight),
      };

      delete formData.image1;

      addMutation.mutate(formData);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || isLoading) return <Loaer />;

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-rose-50 rounded-2xl shadow-lg mt-8 mb-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-600">Add Cat Food 🐾</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Seller Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Seller Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              {...register('sellerName')}
              value={user?.displayName}
              readOnly
              className="sellerform-input"
              placeholder="Seller Name"
            />
            <input
              {...register('sellerEmail')}
              value={user?.email}
              readOnly
              className="sellerform-input"
              placeholder="Seller Email"
            />
            <input
              {...register('sellerPhone')}
              value={sellerdata?.phone || ''}
              readOnly
              className="sellerform-input sm:col-span-2"
              placeholder="Phone"
            />
            <input
              {...register('sellerAddress')}
              value={`${sellerdata?.division || ''}, ${sellerdata?.district || ''}`}
              readOnly
              className="sellerform-input sm:col-span-2"
              placeholder="Address"
            />
          </div>
        </div>

        {/* Food Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Food Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input {...register('name', { required: true })} placeholder="Product Name" className="sellerform-input" />
            <input {...register('brand', { required: true })} placeholder="Brand" className="sellerform-input" />
            <input {...register('weight', { required: true })} type="number" step="0.1" placeholder="Weight (kg)" className="sellerform-input" />
            <input {...register('quantity', { required: true })} type="number" placeholder="Quantity" className="sellerform-input" />
            <input {...register('price', { required: true })} type="number" placeholder="Price (BDT)" className="sellerform-input" />
            <input {...register('category')} placeholder="Category (e.g. Dry, Wet, Treat)" className="sellerform-input" />
          </div>
        </div>

        {/* Nutrition Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Nutrition Info (Optional)</h3>
          <input {...register('ingredients')} placeholder="Ingredients" className="sellerform-input" />
        </div>

        {/* Image Upload */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload Image</h3>
          <input
            type="file"
            accept="image/*"
            {...register('image1', { required: true })}
            className="block mb-2"
          />
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Description</h3>
          <textarea
            {...register('description', { required: true })}
            className="sellerform-input min-h-[100px]"
            placeholder="Describe the product..."
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold rounded-full hover:from-pink-500 hover:to-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Cat Food'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCatFoodForm;
