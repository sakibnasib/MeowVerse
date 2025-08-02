import { useLocation } from 'react-router';

import CheckoutForm from '../../../Components/CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51ReGE0CYRcVB0FFZFPuWKJpjvBpEW3S8qex9qNKs50qk9eoVa2y9n6LEI3bKbgn7TnJo6ZQ03dsqpEIcGlXhjV0w00Vb62rS6G')
const PaymentPage = () => {

 const location = useLocation();
  const order = location.state?.order;

  console.log('Order:', order); // ✅ Should now work
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Pay for Order: {order?.Type}</h2>
     <Elements stripe={stripePromise}>
         <CheckoutForm order={order} />
     </Elements>
    
     
      
    </div>
  );
};

export default PaymentPage;