import RoomCard from "@/components/RoomCard";
import SearchFilter from "@/components/SearchFilter";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const RoomsPage = async ({ searchParams }) => {

  const params = await searchParams;

  const query = new URLSearchParams();

  if (params?.search) {
    query.append("search", params.search);
  }

  if (params?.amenities) {
    query.append("amenities", params.amenities);
  }

  if (params?.minPrice) {
    query.append("minPrice", params.minPrice);
  }

  if (params?.maxPrice) {
    query.append("maxPrice", params.maxPrice);
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res = await fetch(
    `${serverUrl}/rooms?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  const rooms = await res.json();
  console.log(rooms)
  const sortedRooms = [...rooms].reverse();

  return (
    <div className="space-y-8 my-12 lg:my-20 max-w-6xl mx-auto px-4">
      <div>
        <p className="uppercase tracking-[4px] text-sm text-[#b28b5c] mb-2">
          Discover
        </p>

        <h2 className="text-[#da9e38] font-serif font-semibold text-5xl">
          Browse Our Rooms
        </h2>
      </div>

      <SearchFilter
        defaultSearch={params?.search || ""}
        defaultAmenities={params?.amenities || ""}
        defaultMinPrice={params?.minPrice || ""}
        defaultMaxPrice={params?.maxPrice || ""}
      />

      {sortedRooms.length === 0 ? (
        <div className="bg-[#140b05] border border-[#3b2618] rounded-[32px] p-16 text-center">
          <h2 className="text-3xl font-serif text-[#f8f1e7] mb-3">
            No Rooms Found
          </h2>

          <p className="text-gray-400">
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;