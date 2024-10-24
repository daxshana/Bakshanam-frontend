// // Payment.js
// import React, { useEffect, useState } from 'react';
// import '../css/payment.css';

// const Payment = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = `https://www.paypal.com/sdk/js?client-id=AfU-SdjqNWLzt8hQ6CSW0eesZpusRBoCUrpGlPMxnh3GnnkBoretOK9T3z0J5f_YhNfvzWMuHRKTsOyl`; // Replace with your actual Client ID
//     script.async = true;
//     script.onload = () => {
//       setLoading(false); // SDK loaded successfully
//       window.paypal.Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: '3.18', // Amount to charge
//               },
//             }],
//           });
//         },
//         onApprove: async (data, actions) => {
//           const order = await actions.order.capture();
//           console.log('Order captured:', order);
//           alert('Payment successful!');
//           // Handle successful payment (e.g., redirect to a success page)
//         },
//       }).render('#paypal-button-container'); // Render the PayPal button
//     };
//     script.onerror = () => {
//       console.error('Failed to load PayPal SDK');
//       alert('Failed to load PayPal SDK. Please try again later.');
//     };
//     document.body.appendChild(script);

//     return () => {
//       // Cleanup the script if the component is unmounted
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="payment-container">
//       <h2>Pay for Job Matching Service</h2>
//       {loading ? (
//         <div className="loading">Loading payment options...</div>
//       ) : (
//         <div id="paypal-button-container"></div>
//       )}
//     </div>
//   );
// };

// export default Payment;
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentComponent = ({ totalPrice, onPaymentSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState(''); // Payment status state

  const handleSuccessPayment = (details) => {
    setPaymentStatus('Payment successful!');
    console.log('Payment successful:', details);
    onPaymentSuccess(details); // Trigger success callback
  };

  return (
    <div>
      <PayPalScriptProvider options={{ "client-id": "AekNtOqaue-rDWKqAJj9no35ecpAsuWzdvMpHsB33EMm9FAZuK-knv4DHfNl0va1GMKxs_avJiXfN850" }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalPrice.toFixed(2), // Total price for the payment
                },
              }],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            handleSuccessPayment(details); // Call success handler
          }}
          onError={(err) => {
            setPaymentStatus('Payment failed. Please try again.');
            console.error('Payment error:', err);
          }}
        />
      </PayPalScriptProvider>

      {paymentStatus && <div>{paymentStatus}</div>} {/* Display payment status */}
    </div>
  );
};

export default PaymentComponent;