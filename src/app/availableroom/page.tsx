
import RoomCard from "@/components/RoomCard";
import type { Room } from "@/types";

const AvailableRooms = async () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res = await fetch(`${serverUrl}/featured`);
  const rooms: Room[] = await res.json();

  return (
    <div className="space-y-5 my-20 max-w-6xl mx-auto px-3">
      <h2 className="text-[#da9e38] font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl mb-10">
        Available rooms
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
        {rooms?.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AvailableRooms;
