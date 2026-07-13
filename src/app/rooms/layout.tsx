
import React from 'react';

export const metadata = {
  title: "FocusRoom-Rooms",
  description: "Find Your Perfect Focus Zone",
};
const RoomsLayOut = ({children}) => {
  return (
    <div className='max-w-7xl mx-auto'>

      {children}
    </div>
  );
};

export default RoomsLayOut;