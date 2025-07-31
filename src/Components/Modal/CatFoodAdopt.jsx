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

const CatFoodAdopt = ({ isOpen, closeModal, food }) => {
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

    const address = food?.sellerAddress?.toLowerCase().trim();
const sellerDistrict = address?.split(',').pop()?.trim();
    const buyerDistrict = district?.toLowerCase().trim();
console.log(sellerDistrict,buyerDistrict)
    const delivery = sellerDistrict === buyerDistrict ? 150 : 250;
    setDeliveryCharge(delivery);
    setTotal(quantity * food.price + delivery);
  }, [district, quantity, food]);

  const onSubmit = (data) => {
    const order = {
      catId: food._id,
      buyer: user?.email,
      quantity: +data.quantity,
      division: data.division,
      district: data.district,
      phone: data.phone,
      deliveryCharge,
      totalAmount: total,
    //   catName:cat.name,
    //   catBreed:cat.breed,
    //   catGender:cat.gender,
    //   catAge:cat.age,
    //   catColor:cat.color,
    //   catVaccinated:cat.vaccinated,
    //   catWeight:cat.weight,
    //   catImg:cat.imageUrls,
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
            Adopt {food.name} <span className="text-gray-500">({food.brand})</span>
          </DialogTitle>

          {/* Cat Info */}
          <div className="text-sm text-gray-600 mb-4">
            <p>Category: {food.category}</p>
            <p>Weight: {food.weight}kg</p>
            <p>Available: {food.quantity} | Price: ৳{food.price}</p>
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
                {...register('quantity', { required: true, min: 1, max: food.quantity })}
                defaultValue={1}
                min={1}
                max={food.quantity}
                className="w-full border px-3 py-2 rounded text-sm"
              />
              {errors.quantity && (
                <p className="text-xs text-red-500">Must be between 1 and {food.quantity}</p>
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

export default CatFoodAdopt;
