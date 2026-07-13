import RoomCard from '@/components/RoomCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const MyListingsPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

// console.log(session)

  const user = session?.user;
  console.log(user);

  if (!user?.id) {
    return <div>User not logged in</div>;
  }
const {token}= await auth.api.getToken({
    headers: await headers()
  })


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
const res = await fetch(
  `${serverUrl}/mylistings/${user.id}`, 
    {
      headers:{
        authorization: `Bearer ${token}`
       
      }
    }


);

const rooms = await res.json();
const roomsArray = Array.isArray(rooms) ? rooms : [];



  return (
  
    <div className='space-y-5 my-20 max-w-6xl mx-auto px-3'>
        <h2 className='text-[#da9e38] font-serif font-semibold text-5xl'>My Listings</h2>
         {
  roomsArray.length === 0 ? (
    <div className="bg-[#1e1711] border border-[#3b2618] rounded-[32px] p-14 text-center flex flex-col items-center justify-center">
      
      <div className="w-24 h-24 rounded-full bg-[#24140c] flex items-center justify-center mb-6">
        <span className="text-5xl text-[#da9e38]">+</span>
      </div>

      <h2 className="text-4xl font-serif text-[#f8f1e7] mb-4">
        No Listings Yet
      </h2>

      <p className="text-gray-400 max-w-xl mb-8 text-lg">
        You haven’t added any study rooms yet.
        Start creating your first listing and
        share your perfect focus space.
      </p>

      <Link
        href="/add-room"
        className="btn rounded-full bg-[#d89c3d] border-none text-black hover:bg-[#e4aa4b] px-10 text-lg"
      >
        Add New Room
      </Link>
    </div>
  ) : (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        roomsArray.map(room => (
          <RoomCard
            key={room._id}
            room={room}
          />
        ))
      }
    </div>
  )
}
       </div>
  );
};

export default MyListingsPage;