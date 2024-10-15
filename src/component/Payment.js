// // src/pages/Checkout.js
// import React, { useState } from 'react';
// import PayPalButton from '../components/PayPalButton';

// const Checkout = () => {
//     const [orderSuccess, setOrderSuccess] = useState(null);

//     const handleSuccess = (captureData) => {
//         // Handle successful payment here, e.g., save order data
//         console.log('Payment Successful!', captureData);
//         setOrderSuccess(true);
//     };

//     return (
//         <div>
//             <h1>Checkout</h1>
//             <PayPalButton amount="10.00" onSuccess={handleSuccess} />
//             {orderSuccess && <div>Thank you for your order!</div>}
//         </div>
//     );
// };

// export default Checkout;
