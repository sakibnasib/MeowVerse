// import React from 'react';
// import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import useAuth from '../../hook/useAuth';


// // Division & District Data
// const divisionsWithDistricts = {
//   Dhaka: ['Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Narayanganj'],
//   Chittagong: ['Chittagong', "Cox's Bazar", 'Rangamati', 'Bandarban'],
//   Rajshahi: ['Rajshahi', 'Natore', 'Pabna', 'Naogaon'],
//   Khulna: ['Khulna', 'Jessore', 'Satkhira'],
//   Barisal: ['Barisal', 'Bhola', 'Patuakhali'],
//   Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
//   Rangpur: ['Rangpur', 'Dinajpur', 'Thakurgaon'],
//   Mymensingh: ['Mymensingh', 'Netrokona', 'Sherpur'],
// };
// const CatAdopt = ({ closeModal, isOpen, cat}) => {
//     const {user}=useAuth()
//     console.log(cat)
//     return (
//        <Dialog
//       open={isOpen}
//       as='div'
//       className='relative z-10 focus:outline-none '
//       onClose={closeModal}
//     >
//         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <DialogPanel
//               transition
//               className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
//             >
//                 {/* cat inportan info  */}
//                 <div className="">
//                     {/*  */}
//                      <h1 className="text-2xl font-bold text-pink-700 mb-2">{cat.name} <span className="text-lg text-gray-400 font-normal">({cat.breed})</span></h1>
//         <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
//           <span>Gender: <span className="font-semibold text-gray-800">{cat.gender}</span></span>
//           <span>Age: <span className="font-semibold text-gray-800">{cat.age}m</span></span>
//           <span>Color: <span className="font-semibold text-gray-800">{cat.color}</span></span>
//           <span>Weight: <span className="font-semibold text-gray-800">{cat.weight}kg</span></span>
//           <span>Vaccinated: <span className="font-semibold text-gray-800">{cat.vaccinated ? 'Yes' : 'No'}</span></span>
//              <span>Quantity Left: <span className="font-semibold text-gray-800">{cat.quantity }</span></span>
//               <span>Price For each <span className="font-bold text-pink-600">৳{cat.price}</span></span>  
//                </div>
//                 </div>
//                 <hr />
//                 <div className="">
//                     {/* user info */}
//                     <h1 className='text-center font-bold'>User & Oder Info</h1>
//            <form>

//             {/* quntity */}
//             <input type="text" placeholder={user?.name}/>
// {/*  */}
//   {/* Division */}
//         <div className="sellerform-input-group">
//           <label>Division</label>
//           <select
//             className="sellerform-input"
//             {...register('division', { required: true })}
//           >
//             <option value="">Select Division</option>
//             {Object.keys(divisionsWithDistricts).map((div) => (
//               <option key={div} value={div}>
//                 {div}
//               </option>
//             ))}
//           </select>
//           {errors.division && <p className="sellerform-error">Please select a division</p>}
//         </div>

//         {/* District */}
//         <div className="sellerform-input-group">
//           <label>District</label>
//           <select
//             className="sellerform-input"
//             {...register('district', { required: true })}
//             disabled={!selectedDivision}
//           >
//             <option value="">Select District</option>
//             {selectedDivision &&
//               divisionsWithDistricts[selectedDivision].map((dist) => (
//                 <option key={dist} value={dist}>
//                   {dist}
//                 </option>
//               ))}
//           </select>
//           {errors.district && <p className="sellerform-error">Please select a district</p>}
//         </div>
//     <input
//   type="number"
//   className="input validator"
//   required
//   placeholder="quantity "
//   min="1"
//   max={cat.quantity }
// />
// {/*  */}
// <input
//     type="tel"
//     className="tabular-nums"
//     required
//     placeholder="Phone"
//     pattern="[0-9]*"
//     minlength="10"
//     maxlength="10"
//     title="Must be 10 digits"
//   />


//              </form>
//                 </div>
//               <div className="mt-4">
//                 <Button
//                   className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
//                   onClick={closeModal}
//                 >
//                   Got it, thanks!
//                 </Button>
//               </div>
//             </DialogPanel>
//           </div>
//         </div>
//       </Dialog>
//     );
// };

// export default CatAdopt;


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import useAuth from '../../hook/useAuth';

const divisionsWithDistricts = {
  Dhaka: ['Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Narayanganj'],
  Chittagong: ['Chittagong', "Cox's Bazar", 'Rangamati', 'Bandarban'],
  Rajshahi: ['Rajshahi', 'Natore', 'Pabna', 'Naogaon'],
  Khulna: ['Khulna', 'Jessore', 'Satkhira'],
  Barisal: ['Barisal', 'Bhola', 'Patuakhali'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Thakurgaon'],
  Mymensingh: ['Mymensingh', 'Netrokona', 'Sherpur'],
};

const CatAdopt = ({ isOpen, closeModal, cat }) => {
  const { user } = useAuth();
  const [selectedDivision, setSelectedDivision] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [total, setTotal] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const quantity = watch('quantity') || 1;
  const district = watch('district');

  useEffect(() => {
    if (!district) return;

    const sellerDistrict = cat?.sellerAddress?.toLowerCase().trim();
    const buyerDistrict = district?.toLowerCase().trim();

    const delivery = sellerDistrict === buyerDistrict ? 150 : 250;
    setDeliveryCharge(delivery);
    setTotal(quantity * cat.price + delivery);
  }, [district, quantity, cat]);

  const onSubmit = (data) => {
    const order = {
      catId: cat._id,
      buyer: user?.email,
      quantity: +data.quantity,
      division: data.division,
      district: data.district,
      phone: data.phone,
      deliveryCharge,
      totalAmount: total,
    };
    console.log('Submitted Order:', order);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="z-50 fixed inset-0 flex items-center justify-center">
      <div className="fixed " />
      <DialogPanel className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-4 pb-2 overflow-y-auto flex-1">
          <DialogTitle className="text-lg font-bold text-pink-700 text-center mb-2">
            Adopt {cat.name} <span className="text-gray-500">({cat.breed})</span>
          </DialogTitle>

          {/* Cat Info */}
          <div className="text-sm text-gray-600 mb-4">
            <p>Gender: {cat.gender} | Age: {cat.age}m | Color: {cat.color}</p>
            <p>Weight: {cat.weight}kg | Vaccinated: {cat.vaccinated ? 'Yes' : 'No'}</p>
            <p>Available: {cat.quantity} | Price: ৳{cat.price}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <input
                type="text"
                value={user?.displayName}
                disabled
                className="w-full border px-3 py-2 rounded bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                {...register('quantity', { required: true, min: 1, max: cat.quantity })}
                defaultValue={1}
                min={1}
                max={cat.quantity}
                className="w-full border px-3 py-2 rounded text-sm"
              />
              {errors.quantity && (
                <p className="text-xs text-red-500">Must be between 1 and {cat.quantity}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Division</label>
              <select
                {...register('division', { required: true })}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm"
              >
                <option value="">Select Division</option>
                {Object.keys(divisionsWithDistricts).map((div) => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
              {errors.division && (
                <p className="text-xs text-red-500">Division is required</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">District</label>
              <select
                {...register('district', { required: true })}
                className="w-full border px-3 py-2 rounded text-sm"
                disabled={!selectedDivision}
              >
                <option value="">Select District</option>
                {selectedDivision &&
                  divisionsWithDistricts[selectedDivision].map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
              </select>
              {errors.district && (
                <p className="text-xs text-red-500">District is required</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                {...register('phone', { required: true, minLength: 10 })}
                placeholder="01XXXXXXXXX"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              {errors.phone && (
                <p className="text-xs text-red-500">Valid phone is required</p>
              )}
            </div>

            <div className="text-sm mt-2 text-gray-700 space-y-1">
              <p>Delivery Charge: <strong>৳{deliveryCharge}</strong></p>
              <p>Total Amount: <strong className="text-pink-600">৳{total}</strong></p>
            </div>
          </form>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t flex justify-between gap-2">
          <button
            onClick={closeModal}
            className="w-1/2 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            form="form"
            onClick={handleSubmit(onSubmit)}
            className="w-1/2 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white text-sm"
          >
            Confirm
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CatAdopt;

