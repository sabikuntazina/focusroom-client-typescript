import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
  key?: string;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const {
    _id,
    roomName,
    description,
    image,
    floor,
    seatCapacity,
    hourlyRate,
    amenities,
  } = room;

  return (
    <div className="bg-[#1a0f08] border border-[#2d1f12] rounded-3xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300">
      
      {/* Image Section */}
      <div className="relative">
        <Image
          src={image}
          alt={roomName}
          width={500}
          height={350}
          className="w-full h-[300px] object-cover"
        />

        {/* Availability Badge */}
        <div className={`badge  ${room.availability? "badge-success" : "badge-error"} absolute top-4 left-4 text-white px-4 py-4 font-medium`}>
         {room.availability? "Available" : "Not Available"} 
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-[#1f1f1f]/90 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
          <span className="text-yellow-400 text-xs"><FaStar /></span>
          {room.ratings ?? 0}
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 text-white flex items-center gap-1 text-sm">
          <IoLocationOutline />
          <span>{room.location ?? ""}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-white">
        
        {/* Top */}
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-2xl lg:text-3xl font-bold line-clamp-1">
            {roomName}
          </h2>

          <div className="text-right">
            <h3 className="text-[#d89d33] text-3xl font-bold">
              ${hourlyRate}
            </h3>

            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Per Hour
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-4 leading-relaxed">
          {description.length > 90
            ? `${description.slice(0, 90)}...`
            : description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-5">
          {amenities.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="bg-[#3a2818] text-white text-xs px-4 py-2 rounded-full"
            >
              {item}
            </div>
          ))}

          {amenities.length > 3 && (
            <div className="bg-[#3a2818] text-gray-300 text-xs px-4 py-2 rounded-full">
              +{amenities.length - 3}
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="border-t border-[#2d1f12] mt-6 pt-4 flex items-center justify-between text-gray-400 text-sm">
          
          <div className="flex items-center gap-2">
            <HiOutlineUsers />
            <span>{seatCapacity} People</span>
          </div>

          <p>{floor}</p>

          <p>248 bookings</p>
        </div>

        {/* Button */}
        <Link
          href={`/rooms/${_id}`}
          className="btn w-full mt-6 rounded-full bg-[#f4eee3] hover:bg-white text-black border-none text-lg font-medium"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;