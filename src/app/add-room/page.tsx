'use client'
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


// export const metadata = {
//   title: "FocusRoom-add-rooms",
//   description: "Find Your Perfect Focus Zone",
// };

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
  "Coffee Corner",
  "Natural Lighting",
  "Smart TV",
  "Meeting Desk",
  "Private Booth",
  "Soundproof Room",
];

const AddRoomForm = () => {
  const { data: session } = authClient.useSession();
    const user = session?.user;
  const router=useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenities = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(
        selectedAmenities.filter((a) => a !== item)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };
const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const roomsData = {
    roomName: formData.get("roomName"),
    description: formData.get("description"),
    floor: formData.get("floor"),
    image: formData.get("image"),
    hourlyRate: Number(formData.get("hourlyRate")),
    capacity: Number(formData.get("capacity")),
    userName: formData.get("hostName"),
    userEmail: formData.get("hostEmail"),
    userImg: user?.image,
    userId: user?.id,

    // amenities array
    amenities: formData.getAll("amenities"),
  };

  // console.log(roomsData);
const {data:tokenData} = await authClient.token();

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res = await fetch(
    `${serverUrl}/rooms`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
          'authorization': `Bearer ${tokenData?.token}`

      },
      body: JSON.stringify(roomsData),
    }
  );

  const data = await res.json();
  // console.log(data);

  if (data) {
    toast.success("Room published Successfully");
    router.push('/my-listings')

  }
};

  return (
    <div className="min-h-screen bg-[#110c08] px-4 py-12 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">
            Host
          </p>

          <h1 className="text-5xl font-semibold mb-3">
            List a new room
          </h1>

          <p className="text-gray-400 text-lg">
            Add your workspace details and publish instantly.
          </p>
        </div>

        {/* Form Layout */}
       <form onSubmit={onSubmit}>
  <div className="grid lg:grid-cols-3 gap-6">

    {/* Left Side */}
    <div className="lg:col-span-2 space-y-6">

      {/* Main Form */}
      <div className="bg-[#1e1711] border border-[#3b1f0de2] rounded-3xl p-6 space-y-5">

        {/* Room Name */}
        <div>
          <label className="label">
            <span className="label-text uppercase text-xs text-gray-500">
              Room Name
            </span>
          </label>

          <input
            type="text"
            name="roomName"
            placeholder="Atlas Reading Room"
            className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text uppercase text-xs text-gray-500">
              Description
            </span>
          </label>

          <textarea
            rows={5}
            name="description"
            placeholder="Describe the atmosphere..."
            className="textarea w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white"
          />
        </div>

        {/* Floor */}
        <div>
          <label className="label">
            <span className="label-text uppercase text-xs text-gray-500">
              Floor / Unit
            </span>
          </label>

          <input
            type="text"
            name="floor"
            placeholder="3rd Floor"
            className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-[#1e1711] border border-[#2f1d12] rounded-3xl p-6">

        <input
          type="text"
          name="image"
          placeholder="https://..."
          className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white"
        />

      </div>
{/* Amenities */}
<div className="bg-[#1e1711] border border-[#2f1d12] rounded-3xl p-6">

  {/* Heading */}
  <div className="mb-6">
    <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">
      Workspace Features
    </p>

    <h2 className="text-3xl font-semibold">
      Select Amenities
    </h2>

    <p className="text-gray-400 mt-2">
      Choose what your room offers to guests.
    </p>
  </div>

  {/* Amenities List */}
  <div className="flex flex-wrap gap-3">

    {amenitiesList.map((item) => (
      <label
        key={item}
        className={`cursor-pointer px-5 py-3 rounded-full border transition-all duration-300 font-medium ${
          selectedAmenities.includes(item)
            ? "bg-[#d8a23a] border-[#d8a23a] text-black shadow-lg shadow-[#d8a23a]/20"
            : "bg-[#110c08] border-[#3a2417] text-gray-300 hover:border-[#d8a23a] hover:text-white"
        }`}
      >
        <input
          type="checkbox"
          name="amenities"
          value={item}
          className="hidden"
          onChange={() => handleAmenities(item)}
        />

        {item}
      </label>
    ))}

  </div>
</div>
    </div>

    {/* Right Side */}
    <div className="space-y-6">

     {/* Pricing */}
<div className="bg-[#1e1711] border border-[#2f1d12] rounded-3xl p-6 space-y-5">

  {/* Hourly Rate */}
  <div>
    <label className="label">
      <span className="label-text uppercase text-xs text-gray-500">
        Hourly Rate ($)
      </span>
    </label>

    <input
      type="number"
      name="hourlyRate"
      placeholder="20"
      className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white"
    />
  </div>

  {/* Capacity */}
  <div>
    <label className="label">
      <span className="label-text uppercase text-xs text-gray-500">
        Capacity
      </span>
    </label>

    <input
      type="number"
      name="capacity"
      placeholder="4"
      className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white"
    />
  </div>
</div>

      {/* Host Information */}
     <div className="bg-[#1e1711] border border-[#2f1d12] rounded-3xl p-6 space-y-5">

  <h2 className="text-3xl font-medium mb-2">
    Host Information
  </h2>

  {/* User Name */}
  <div>
    <label className="label">
      <span className="label-text uppercase text-xs text-gray-500">
        Host Name
      </span>
    </label>

    <input
      type="text"
      name="hostName"
      placeholder="Sabikun Tazina"
      className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white focus:border-[#d8a23a] focus:outline-none"
    />
  </div>

  {/* User Email */}
  <div>
    <label className="label">
      <span className="label-text uppercase text-xs text-gray-500">
        Host Email
      </span>
    </label>

    <input
      type="email"
      name="hostEmail"
      placeholder="sabikun@email.com"
      className="input w-full bg-[#110c08] border border-[#3a2417] rounded-2xl text-white focus:border-[#d8a23a] focus:outline-none"
    />
  </div>

</div>

 {/* Earnings Preview */}
            <div className="bg-[#1e1711] border border-[#2f1d12] rounded-3xl p-6">

              <h2 className="text-2xl font-medium mb-5">
                Preview earnings
              </h2>

              <div className="space-y-4 text-gray-300">

                <div className="flex justify-between">
                  <span>Hourly rate</span>
                  <span>$20</span>
                </div>

                <div className="flex justify-between">
                  <span>20 bookings · 2 hrs</span>
                  <span>$800</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Service fee (10%)</span>
                  <span>-$80</span>
                </div>

                <div className="divider my-1"></div>

                <div className="flex justify-between text-xl font-semibold">
                  <span>Estimated monthly</span>

                  <span className="text-[#d8a23a]">
                    $720
                  </span>
                </div>

              </div>
            </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn w-full rounded-full bg-[#d8a23a] hover:bg-[#ebb247] border-none text-black text-lg"
      >
        Publish Room
      </button>
    </div>
  </div>
</form>
      </div>
    </div>
  );
};

export default AddRoomForm;

{/*  */}

 