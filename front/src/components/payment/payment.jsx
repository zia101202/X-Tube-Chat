import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment Successful", paymentMethod);
      // Pass `paymentMethod.id` to your backend to complete the payment
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Secure Payment</h2>
      
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Card Details</label>
        <div className="p-3 border border-gray-300 rounded-lg focus-within:border-blue-500">
          <CardElement
            className="w-full"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#a0aec0',
                  },
                },
                invalid: {
                  color: '#ff6b6b',
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Pay
      </button>
    </form>
  );
}

export default PaymentForm;
