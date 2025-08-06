import React from 'react';
import useAuth from '../../hook/useAuth';
import './seller.css';
import Loaer from '../../Components/Loaer/Loaer';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import useAxiosSecure from '../../hook/useAxiosSecure';

// Division & District Data
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

const Sellerform = () => {
  const { user, loading } = useAuth();
const axiosSecure =useAxiosSecure()
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      age: '',
      phone: '',
      division: '',
      district: '',
      DateofBirth: null,
    },
  });

  const selectedDivision = watch('division');

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    axiosSecure.patch(`/user/applied/${user?.email}`, data)
      .then(response => {
        console.log('Success:', response.data);
        alert('Form submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.');
      });
    reset();
  };

  if (loading) return <Loaer />;

  return (
    <div className="sellerform-container">
      <h2 className="sellerform-title">Become a Seller</h2>
      <p className="sellerform-subtitle">Fill out the form to become a seller</p>

      <form onSubmit={handleSubmit(onSubmit)} className="sellerform-form" autoComplete="off">
        {/* Name */}
        <div className="sellerform-input-group">
          <label>Name</label>
          <input
            className="sellerform-input"
            {...register('name')}
            readOnly
          />
        </div>

        {/* Email */}
        <div className="sellerform-input-group">
          <label>Email</label>
          <input
            className="sellerform-input"
            {...register('email')}
            readOnly
          />
        </div>

        {/* Age */}
        <div className="sellerform-input-group">
          <label>Age</label>
          <input
            type="number"
            className="sellerform-input"
            {...register('age', { required: true, min: 18 })}
            placeholder="Minimum 18"
          />
          {errors.age && <p className="sellerform-error">Age must be at least 18</p>}
        </div>

        {/* Phone */}
        <div className="sellerform-input-group">
          <label>Phone</label>
          <input
            type="tel"
            className="sellerform-input"
            {...register('phone', { required: true })}
            placeholder="+880123-456-7890"
          />
          {errors.phone && <p className="sellerform-error">Phone is required</p>}
        </div>

        {/* Division */}
        <div className="sellerform-input-group">
          <label>Division</label>
          <select
            className="sellerform-input"
            {...register('division', { required: true })}
          >
            <option value="">Select Division</option>
            {Object.keys(divisionsWithDistricts).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors.division && <p className="sellerform-error">Please select a division</p>}
        </div>

        {/* District */}
        <div className="sellerform-input-group">
          <label>District</label>
          <select
            className="sellerform-input"
            {...register('district', { required: true })}
            disabled={!selectedDivision}
          >
            <option value="">Select District</option>
            {selectedDivision &&
              divisionsWithDistricts[selectedDivision].map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
          </select>
          {errors.district && <p className="sellerform-error">Please select a district</p>}
        </div>

        {/* Date of Birth */}
        <div className="sellerform-input-group">
          <label>Date of Birth</label>
          <Controller
            control={control}
            name="dob"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                className="sellerform-input"
                placeholderText="Select your date of birth"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                isClearable
                {...field}
              />
            )}
          />
          {errors.dob && <p className="sellerform-error">Date of birth is required</p>}
        </div>

        <button type="submit" className="sellerform-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sellerform;
