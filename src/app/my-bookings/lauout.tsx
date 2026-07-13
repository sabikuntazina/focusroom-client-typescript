
import React from 'react';

export const metadata = {
  title: "FocusRoom-My-Bookings",
  description: "Find Your Perfect Focus Zone",
};
const MyBookingLayOut = ({children}) => {
  return (
    <div className='max-w-7xl mx-auto'>

      {children}
    </div>
  );
};

export default MyBookingLayOut;