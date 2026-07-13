
import React from 'react';

export const metadata = {
  title: "FocusRoom-My-Listings",
  description: "Find Your Perfect Focus Zone",
};
const MyListings = ({children}) => {
  return (
    <div className='max-w-7xl mx-auto'>

      {children}
    </div>
  );
};

export default MyListings;