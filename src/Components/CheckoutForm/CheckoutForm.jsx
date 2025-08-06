// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { useMutation } from '@tanstack/react-query';
// import useAuth from '../../hook/useAuth';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import './checkoutform.css'
// const CheckoutForm = ( {order} ) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user } = useAuth();
 

//   const mutation = useMutation({
//     mutationFn: async (paymentData) => {
//       const res = await axios.post('http://localhost:3000/payments', paymentData);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire('Success', 'Payment Successful & Order Approved!', 'success');
//     },
//     onError: () => {
//       Swal.fire('Error', 'Payment failed or incomplete.', 'error');
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     try {
//       // Step 1: Create PaymentIntent
//       const { data: clientSecret } = await axios.post('http://localhost:3000/create-payment-intent', {
//         amount: order.totalAmount,
//       });

//       // Step 2: Confirm Card Payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: user.displayName,
//             email: user.email,
//           },
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         mutation.mutate({
//           orderId: order._id,
//           amount: order.totalAmount,
//           email: user.email,
//           transactionId: result.paymentIntent.id,
//         });
//       }
//     } catch (err) {
//       setError('Payment processing failed.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
// console.log(order)
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;


// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { useMutation } from '@tanstack/react-query';
// import useAuth from '../../hook/useAuth';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useEffect, useState } from 'react';
// import './checkoutform.css';

// const CheckoutForm = ({ order }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user } = useAuth();

//   const [quantity, setQuantity] = useState(order.quantity || 1);
//   const [deliveryCharge, setDeliveryCharge] = useState(order.deliveryCharge || 0);
//   const [total, setTotal] = useState(order.totalAmount || 0);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const mutation = useMutation({
//     mutationFn: async (paymentData) => {
//       const res = await axios.post('http://localhost:3000/payments', paymentData);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire('Success', 'Payment Successful & Order Approved!', 'success');
//     },
//     onError: () => {
//       Swal.fire('Error', 'Payment failed or incomplete.', 'error');
//     },
//   });

//   useEffect(() => {
//     const basePrice = order?.singlepicePrice || order.totalAmount - order.deliveryCharge;
//     setTotal(basePrice * quantity + deliveryCharge);
//   }, [quantity, deliveryCharge, order]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!stripe || !elements) return;

//     try {
//       const { data: clientSecret } = await axios.post('http://localhost:3000/create-payment-intent', {
//         amount: total,
//       });

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: user.displayName,
//             email: user.email,
//           },
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         mutation.mutate({
//           orderId: order._id,
//           amount: total,
//           quantity,
//           email: user.email,
//           transactionId: result.paymentIntent.id,
//         });
//       }
//     } catch (err) {
//       setError('Payment processing failed.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (delta) => {
//     const newQty = quantity + delta;
//     if (newQty >= 1 && newQty <= order.maxQuantity) {
//       setQuantity(newQty);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow p-6 rounded-md space-y-4">
//       <h2 className="text-xl font-semibold text-center">Confirm Your Order</h2>

//       {/* Order Info */}
//       <div className="space-y-2 text-gray-700">
//         <p><strong>Product:</strong> {order.catName || order.foodName}</p>
//         <p><strong>Unit Price:</strong> ৳{order.singlepicePrice}</p>
//         <p><strong>Delivery:</strong> ৳{deliveryCharge}</p>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-3">
//           <span><strong>Quantity:</strong></span>
//           <button
//             type="button"
//             className="btn btn-sm"
//             onClick={() => handleQuantityChange(-1)}
//             disabled={quantity === 1}
//           >
//             -
//           </button>
//           <span className="font-medium">{quantity}</span>
//           <button
//             type="button"
//             className="btn btn-sm"
//             onClick={() => handleQuantityChange(1)}
//             disabled={quantity === order.maxQuantity}
//           >
//             +
//           </button>
//         </div>

//         <p className="text-lg font-semibold">Total: ৳{total}</p>
//       </div>

//       {/* Stripe Card Element */}
//       <div className="border p-3 rounded-md">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: '#424770',
//                 '::placeholder': { color: '#aab7c4' },
//               },
//               invalid: { color: '#9e2146' },
//             },
//           }}
//         />
//       </div>

//       {/* Error & Button */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         type="submit"
//         className="btn btn-primary w-full"
//         disabled={!stripe || loading}
//       >
//         {loading ? 'Processing…' : `Pay ৳${total}`}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;


import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import './checkoutform.css';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
   const navigate = useNavigate();
  const { user } = useAuth();
const axiosSecure=useAxiosSecure()

  const [quantity, setQuantity] = useState(order.quantity || 1);
  const [deliveryCharge, setDeliveryCharge] = useState(order.deliveryCharge || 0);
  const [total, setTotal] = useState(order.totalAmount || 0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosSecure.post('/payments', paymentData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Payment Successful & Order Approved!', 'success').then(() => {
  navigate('/dashboard/confirm-order');
});;
    },
    onError: () => {
      Swal.fire('Error', 'Payment failed or incomplete.', 'error');
    },
  });

  useEffect(() => {
    const basePrice = order?.singlepicePrice|| order.totalAmount - order.deliveryCharge;
    setTotal(basePrice * quantity + deliveryCharge);
  }, [quantity, deliveryCharge, order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const { data: clientSecret } = await axiosSecure.post('/create-payment-intent', {
        quantity, orderId: order._id,deliveryCharge
      });
console.log(clientSecret.clientSecret)
      const result = await stripe.confirmCardPayment(clientSecret.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        mutation.mutate({
          orderId: order._id,
          amount: total,
          quantity,
         deliveryCharge: order.deliveryCharge,
          email: user.email,
          transactionId: result.paymentIntent.id,
        });
      }
    } catch (err) {
      setError('Payment processing failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
   console.log(order.maxQuantity)
    if (newQty >= 1 && newQty <= order.maxQuantity) {
       const totalq=parseInt(newQty)
      console.log(totalq)
      setQuantity(totalq);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow p-6 rounded-md space-y-4">
      <h2 className="text-xl font-semibold text-center">Confirm Your Order</h2>

      {/* Order Info */}
      <div className="space-y-2 text-gray-700">
        <p><strong>Product:</strong> {order.catName || order.foodName}</p>
        <p><strong>Unit Price:</strong> ৳{order.singlepicePrice}</p>
        <p><strong>Delivery:</strong> ৳{deliveryCharge}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3">
          <span><strong>Quantity:</strong></span>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => handleQuantityChange(+1)}
             disabled={quantity === order.maxQuantity}
          >
            +
          </button>
        </div>

        <p className="text-lg font-semibold">Total: ৳{total}</p>
      </div>

      {/* Stripe Card Element */}
      <div className="border p-3 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </div>

      {/* Error & Button */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing…' : `Pay ৳${total}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
