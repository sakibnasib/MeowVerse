import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hook/useAuth';
import { imageUpload } from '../../../api/utils';
import Loaer from '../../../Components/Loaer/Loaer';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';



const catBreeds = [
  'Persian',
  'Maine Coon',
  'Bengal',
  'Ragdoll',
  'British Shorthair',
  'Scottish Fold',
  'Abyssinian',
  'Oriental Shorthair',
  'Russian Blue',
  'Birman',
  'Norwegian Forest Cat',
  'Turkish Angora',
  'Savannah',
  
];

const AddCatForm = () => {
  const { user, loading } = useAuth();
const axiosSecure =useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm();

  const imageUrls = watch(['image1', 'image2', 'image3']);
const {data:sellerdata=[],isLoading} = useQuery({
  queryKey:['user'],
   enabled: !loading && !!user?.email,
  queryFn:async ()=>{
    const {data}=await axiosSecure.get(`/user/${user?.email}`)
    return data
  }
})

const addMutation=useMutation({
  mutationFn:async(formData)=>{
     const res = await axiosSecure.post('/cats', formData)
      return res.data
  },
   onSuccess: () => {
      Swal.fire('Updated', 'Cat added successfully!', 'success')
    },
    onError: () => {
      Swal.fire('Error', 'Failed to add cat.', 'error')
    },
})

  const onSubmit = async (data) => {
    try {
      const images = [];
      for (const fileField of ['image1', 'image2', 'image3']) {
        const file = data[fileField][0];
        const url = await imageUpload(file);
        if (url) images.push(url);
      }

      const formData = {
        ...data,
        sellerName: user?.displayName || '',
        sellerEmail: user?.email || '',
        imageUrls: images,
      };

      delete formData.image1;
      delete formData.image2;
      delete formData.image3;
      formData.price = parseFloat(formData.price);
      formData.quantity = parseInt(formData.quantity);
      // Call the mutation to add the cat
       addMutation.mutate(formData)
      console.log('Submitted:', formData);
      // await postCat(formData);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };
  if (loading ||isLoading) return <Loaer />;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 bg-rose-50 rounded-2xl shadow-lg mt-8 mb-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-600">Add Your Cat 🐱</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Seller Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Seller Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-600">Seller Name</label>
              <input
                {...register('sellerName')}
                defaultValue={user?.displayName}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-600">Seller Email</label>
              <input
                {...register('sellerEmail')}
                defaultValue={user?.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 font-medium text-gray-600">Phone Number</label>
              <input
  {...register('sellerPhone')}
   value={sellerdata?.phone || ''}
  readOnly
  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
/>
            </div>
             <div className="sm:col-span-2">
              <label className="block mb-2 font-medium text-gray-600">Address</label>
              <input
                {...register('sellerAddress')}
   value={`${sellerdata?.division || ''}, ${sellerdata?.district || ''}`}
  readOnly
                // value={sellerdata?.address || ''}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input {...register('name', { required: true })} placeholder="Cat Name" className="sellerform-input" />

            <select {...register('breed', { required: true })} className="sellerform-input">
              <option value="">Select Breed</option>
              {catBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>

            <select {...register('gender', { required: true })} className="sellerform-input">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input {...register('age', { required: true })} type="number" placeholder="Age (months)" minLength={1} className="sellerform-input" />
            <input {...register('color', { required: true })} placeholder="Color" className="sellerform-input" />
            <input {...register('weight', { required: true })} type="number" placeholder="Weight (kg)" className="sellerform-input" />
            <input {...register('quantity', { required: true })} type="number" placeholder="Quantity Available" className="sellerform-input" />
            <input {...register('price', { required: true })} type="number" placeholder="Price" className="sellerform-input" />
          </div>
        </div>

        {/* Health & Personality */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Health & Personality</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <select {...register('vaccinated', { required: true })} className="sellerform-input">
              <option value="">Vaccinated?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input {...register('temperament')} placeholder="Temperament (e.g. calm, playful)" className="sellerform-input" />
          </div>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload Cat Photos</h3>
          {[1, 2, 3].map((i) => (
            <input
              key={i}
              type="file"
              accept="image/*"
              {...register(`image${i}`, { required: true })}
              className="block mb-2"
            />
          ))}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Description</h3>
          <textarea {...register('description', { required: true })} className="sellerform-input min-h-[100px]" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold rounded-full hover:from-pink-500 hover:to-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCatForm;
