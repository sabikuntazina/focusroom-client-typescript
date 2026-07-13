import Image from "next/image";
import {
  FaStar,
  FaWifi,
  FaSnowflake,
  FaChair,
} from "react-icons/fa";

import {
  MdOutlineMeetingRoom,
  MdOutlinePower,
} from "react-icons/md";

import { BsProjector } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";

import BookingModal from "@/components/BookingModal";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditRoomModal from "@/components/EditRoomModal";
import DeleteRoomModal from "@/components/DeleteRoomModal";
import Link from "next/link";


export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res =await fetch(`${serverUrl}/rooms/${id}`);
  const room=await res.json();

  return {
    title: `FocusRoom- ${room.roomName}`,
  };
};


const amenityIcons = {
  "Wi-Fi": <FaWifi />,
  "Power Outlets": <MdOutlinePower />,
  "Air Conditioning": <FaSnowflake />,
  Whiteboard: <MdOutlineMeetingRoom />,
  Projector: <BsProjector />,
};



const RoomDetails =async ({ params }) => {
  const {id} =await params;
 
  // user information 

  const session = await auth.api.getSession({
  headers: await headers(),
});

const user = session?.user;
  // console.log(id);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res =await fetch(`${serverUrl}/rooms/${id}`);
  const room=await res.json();

 

  const {
    roomName,
    description,
    image,
    location,
    floor,
    seatCapacity,
    hourlyRate,
    availability,
    ratings,
    amenities,
  } = room;


const isOwner = user?.id === room?.userId;
  
  return (
    <div className="min-h-screen bg-[#0f0702] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Container */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Side Image */}
          <div className="relative">
            <Image
              src={image}
              alt={roomName}
              width={700}
              height={500}
              className="w-full h-[500px] object-cover rounded-3xl"
            />

            {/* Availability */}
            <div
              className={`badge absolute top-5 left-5 px-5 py-4 text-white border-none ${
                availability
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {availability ? "Available" : "Unavailable"}
            </div>
       {/* Owner Actions */}
{
  isOwner && (
    <div className="mt-6 bg-[#1a0f08] border border-[#2d1f12] rounded-3xl p-6">
      
      <div className="flex items-center justify-between mb-6">
        
        <div>
          <h3 className="text-2xl font-semibold text-[#f8f1e7]">
            Manage Listing
          </h3>

          <p className="text-gray-400 mt-1">
            Edit room details or remove this listing.
          </p>
        </div>

        <div className="badge badge-warning text-black px-4 py-3">
          Owner
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Edit */}
       <EditRoomModal room={room} />

        {/* Delete */}
 <DeleteRoomModal room={room} />
      </div>
    </div>
  )
}

            {/* Rating */}
            <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-yellow-400"><FaStar /></span>
              <span className="font-semibold">{ratings}</span>
            </div>
          </div>

          {/* Right Side Content */}
          <div>
            
            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              
              <div>
                <h1 className="text-5xl font-bold leading-tight">
                  {roomName}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 mt-4">
                  <span className="text-lg"><IoLocationOutline /></span>
                  <span>
                    {location} · {floor}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-[#1d120a] border border-[#2d1f12] rounded-2xl px-6 py-5 text-center">
                <h2 className="text-4xl font-bold text-[#d89d33]">
                  ${hourlyRate}
                </h2>

                <p className="uppercase tracking-[3px] text-xs text-gray-400 mt-1">
                  Per Hour
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-3">
                About this room
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-5 mt-8">
              
              <div className="bg-[#1a0f08] border border-[#2d1f12] rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-[#2e1d0f] p-4 rounded-xl text-[#d89d33] text-2xl">
                  <HiOutlineUsers />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Seat Capacity
                  </p>

                  <h4 className="text-xl font-semibold">
                    {seatCapacity} People
                  </h4>
                </div>
              </div>

              <div className="bg-[#1a0f08] border border-[#2d1f12] rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-[#2e1d0f] p-4 rounded-xl text-[#d89d33] text-2xl">
                  <FaChair />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Room Type
                  </p>

                  <h4 className="text-xl font-semibold">
                    Private Space
                  </h4>
                </div>
              </div>
            </div>

            {/* host information  */}
            <div className="bg-[#1a0f08] border border-[#2d1f12] rounded-2xl p-5 flex items-center gap-4">
              
                <div className="bg-[#2e1d0f] p-4 rounded-xl text-[#d89d33] text-2xl">
                  <Image
                  src={room?.userImg}
                  alt="host image"
                  height={65}
                  width={65}
                  className="rounded-xl"
                  ></Image>
                  
                </div>

                

                <div>
                   <h4 className="text-xl font-semibold">
                   {room?.userName}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    HOST
                  </p>

                 
                </div>
              </div>

            {/* Amenities */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-5">
                Amenities
              </h3>

              <div className="flex flex-wrap gap-4">
                {amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-[#1a0f08] border border-[#2d1f12] px-5 py-3 rounded-full"
                  >
                    <span className="text-[#d89d33] text-lg">
                      {amenityIcons[item]}
                    </span>

                    <span className="text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              
              {/* <button className="btn flex-1 rounded-full bg-[#d89d33] hover:bg-[#f0b44b] border-none text-black text-lg">
                Book Now
              </button> */}
              
             {
  user ? (
    <BookingModal room={room} />
  ) : (
    <Link
      href="/login"
      className="btn flex-1 rounded-full bg-[#d89d33] hover:bg-[#f0b44b] border-none text-black text-lg"
    >
      Book Now
    </Link>
  )
}

              <button className="btn flex-1 rounded-full btn-outline border-[#d89d33] text-[#d89d33] hover:bg-[#d89d33] hover:text-black text-lg">
                Contact Host
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;