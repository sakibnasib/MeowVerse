// import React, { useEffect, useState, Fragment } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { useForm } from 'react-hook-form';
// import { imageUpload } from '../../api/utils';

// const EditCatModal = ({ isOpen, onClose, cat, onSubmit }) => {
//   const [imageFiles, setImageFiles] = useState([null, null, null]);
//   const [previews, setPreviews] = useState([
//     cat?.imageUrls?.[0] || null,
//     cat?.imageUrls?.[1] || null,
//     cat?.imageUrls?.[2] || null,
//   ]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: cat,
//   });

//   useEffect(() => {
//     if (cat) {
//       reset(cat);
//       setPreviews([
//         cat.imageUrls?.[0] || null,
//         cat.imageUrls?.[1] || null,
//         cat.imageUrls?.[2] || null,
//       ]);
//       setImageFiles([null, null, null]);
//     }
//   }, [cat, reset]);

//   const handleImageChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newImageFiles = [...imageFiles];
//       newImageFiles[index] = file;
//       setImageFiles(newImageFiles);

//       const newPreviews = [...previews];
//       newPreviews[index] = URL.createObjectURL(file);
//       setPreviews(newPreviews);
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       const uploadedUrls = await Promise.all(
//         imageFiles.map(async (file, i) => {
//           if (file) {
//             return await imageUpload(file);
//           }
//           return cat.imageUrls?.[i] || '';
//         })
//       );

//       // Convert price and quantity to numbers before sending
//       const finalData = {
//         ...formData,
//         price: Number(formData.price),
//         quantity: Number(formData.quantity),
//         imageUrls: uploadedUrls,
//       };

//       await onSubmit(finalData);
//       onClose();
//     } catch (error) {
//       console.error('Image upload or update failed', error);
//     }
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Overlay */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/40" />
//         </Transition.Child>

//         {/* Modal Panel */}
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-200"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-100"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Dialog.Panel
//               className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6 max-h-screen overflow-y-auto sm:p-8"
//             >
//               <Dialog.Title className="text-2xl font-semibold mb-6 text-center text-gray-800">
//                 Edit Cat
//               </Dialog.Title>

//               <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
//                 {/* Image Uploads */}
//                 <div>
//                   <label className="block text-lg font-medium mb-3 text-gray-700">
//                     Upload Cat Photos (up to 3)
//                   </label>
//                   <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
//                     {[0, 1, 2].map((i) => (
//                       <div key={i} className="flex flex-col items-center">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(i, e)}
//                           className="mb-3 cursor-pointer rounded border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {previews[i] && (
//                           <img
//                             src={previews[i]}
//                             alt={`Preview ${i + 1}`}
//                             className="w-28 h-28 object-cover rounded border border-gray-300 shadow-sm"
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
//                   <input
//                     {...register('name', { required: 'Name is required' })}
//                     className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       errors.name ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter cat name"
//                   />
//                   {errors.name && (
//                     <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
//                   )}
//                 </div>

//                 {/* Breed */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">Breed</label>
//                   <input
//                     {...register('breed', { required: 'Breed is required' })}
//                     className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       errors.breed ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter breed"
//                   />
//                   {errors.breed && (
//                     <p className="text-sm text-red-600 mt-1">{errors.breed.message}</p>
//                   )}
//                 </div>

//                 {/* Price & Quantity: Side by side on md+ */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">Price (৳)</label>
//                     <input
//                       type="number"
//                       {...register('price', { required: 'Price is required', min: 0 })}
//                       className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.price ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="Enter price"
//                       min="0"
//                     />
//                     {errors.price && (
//                       <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
//                     <input
//                       type="number"
//                       {...register('quantity', { required: 'Quantity is required', min: 0 })}
//                       className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.quantity ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="Enter quantity"
//                       min="0"
//                     />
//                     {errors.quantity && (
//                       <p className="text-sm text-red-600 mt-1">{errors.quantity.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">Gender</label>
//                   <select
//                     {...register('gender')}
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
//                     defaultValue={cat?.gender || ''}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>

//                 {/* Age */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">Age</label>
//                   <input
//                     {...register('age')}
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
//                     placeholder="Enter age"
//                   />
//                 </div>

//                 {/* Color */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">Color</label>
//                   <input
//                     {...register('color')}
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
//                     placeholder="Enter color"
//                   />
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end space-x-3 pt-6">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//                   >
//                     {isSubmitting ? 'Updating...' : 'Update'}
//                   </button>
//                 </div>
//               </form>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default EditCatModal;


import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../api/utils';

const EditCatModal = ({ isOpen, onClose, cat, onSubmit }) => {
  const [imageFiles, setImageFiles] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: cat || {},
  });

  useEffect(() => {
    if (cat) {
      reset(cat);
      setPreviews([
        cat.imageUrls?.[0] || null,
        cat.imageUrls?.[1] || null,
        cat.imageUrls?.[2] || null,
      ]);
      setImageFiles([null, null, null]);
    }
  }, [cat, reset]);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);

      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const uploadedUrls = await Promise.all(
        imageFiles.map(async (file, i) => {
          if (file) return await imageUpload(file);
          return cat?.imageUrls?.[i] || '';
        })
      );

      const finalData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        imageUrls: uploadedUrls,
      };

      await onSubmit(finalData);
      onClose();
    } catch (error) {
      console.error('Image upload or update failed', error);
      alert('Failed to update cat info.');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
                <Dialog.Title className="text-2xl font-semibold mb-6 text-center">
                  Edit Cat Info
                </Dialog.Title>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Images</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex flex-col items-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(i, e)}
                            className="file-input w-full"
                          />
                          {previews[i] && (
                            <img
                              src={previews[i]}
                              alt={`Preview ${i + 1}`}
                              className="mt-2 w-24 h-24 object-cover rounded shadow"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grid Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        {...register('name', { required: true })}
                        className="input w-full"
                        placeholder="Cat name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Breed</label>
                      <input {...register('breed')} className="input w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Gender</label>
                      <select {...register('gender')} className="input w-full">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Age</label>
                      <input {...register('age')} className="input w-full" placeholder="Age in months" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Color</label>
                      <input {...register('color')} className="input w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Weight (kg)</label>
                      <input {...register('weight')} className="input w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Quantity</label>
                      <input type="number" {...register('quantity')} className="input w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Price (৳)</label>
                      <input type="number" {...register('price')} className="input w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Vaccinated</label>
                      <select {...register('vaccinated')} className="input w-full">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium">Temperament</label>
                      <input {...register('temperament')} className="input w-full" />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium">Description</label>
                      <textarea {...register('description')} className="input w-full" rows={3} />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditCatModal;
