"use client";
import { authClient } from "@/lib/auth-client";
import { getDialog } from "@/lib/dom";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { Room, MutationResponse } from "@/types";
import type { FormEvent } from "react";

const allSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function BookingModal({ room }: { room: Room }) {
  // console.log(room)
  const {hourlyRate} =room
  // Today's date
  const today = new Date().toISOString().split("T")[0];
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingDate, setBookingDate] = useState(today);
  const [note, setNote] = useState("");

  // End time options
  const filteredEndTimes = useMemo(() => {
    if (!startTime) return [];

    const startIndex = allSlots.indexOf(startTime);

    return allSlots.filter((_, i) => i > startIndex);
  }, [startTime]);

  //  const onChange=(e) => {
  //   setBookingDate(e.target.value)
  //   setStartTime(e.target.value);
  //   setEndTime("");
  // }
  // Total cost
  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);

    return (endHour - startHour) * hourlyRate;
  }, [startTime, endTime]);

  const status = "confirmed";

  // User information
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  // Handle booking
  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookingData = {
      bookingDate,
      startTime,
      endTime,
      totalCost,
      note,
      status,
      roomImg: room.image,
      roomName: room.roomName,
      userId: user?.id,
      userName: user?.name,
      roomId: room._id,
    };
    console.log(bookingData);
    const { data: tokenData } = await authClient.token();
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
    const res = await fetch(`${serverUrl}/bookings`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });
    const result: MutationResponse = await res.json();
    console.log(result);
    if (result.insertedId) {
      toast.success("Room booked successfully!");
      getDialog("booking_modal").close();
    } else if (result.message === "already booked") {
      toast.error("This room is already booked for this slot!");
    }
  };

  return (
    <>
      {/* Open Button */}
      <button
        className="btn flex-1 rounded-full bg-[#d89d33] hover:bg-[#f0b44b] border-none text-black text-lg"
        onClick={() => getDialog("booking_modal").showModal()}
      >
        Book Now
      </button>

      {/* Modal */}
      <dialog id="booking_modal" className="modal px-2 sm:px-4">
        <div
          className="  modal-box w-full max-w-lg bg-[#140b05] border border-[#3b2618] rounded-2xl sm:rounded-[32px] text-white p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="border-b border-[#2d1b11] p-7">
            <p className="uppercase tracking-[4px] text-sm text-[#b28b5c] mb-2">
              Reserve
            </p>

            <h3 className="text-4xl font-serif text-[#f8f1e7]">Book a Room</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleBooking} className="p-7 space-y-6">
            {/* Date */}
            <div>
              <label className="label">
                <span className="label-text text-[#c6a57a]">Booking Date</span>
              </label>

              <input
                type="date"
                required
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="input w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
              />
            </div>

            {/* Time Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Start Time */}
              <div>
                <label className="label">
                  <span className="label-text text-[#c6a57a]">Start Time</span>
                </label>

                <select
                  required
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setEndTime("");
                  }}
                  className="select w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
                >
                  <option value="">Select Start Time</option>

                  {allSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Time */}
              <div>
                <label className="label">
                  <span className="label-text text-[#c6a57a]">End Time</span>
                </label>

                <select
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="select w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
                >
                  <option value="">Select End Time</option>

                  {filteredEndTimes.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-[#1c120c] border border-[#3b2618] rounded-3xl p-6">
              <p className="uppercase tracking-[3px] text-sm text-[#b28b5c] mb-2">
                Total Cost
              </p>

              <h2 className="text-5xl text-[#e6b04d] font-semibold">
                ${totalCost}
              </h2>
            </div>

            {/* Note */}
            <div>
              <label className="label">
                <span className="label-text text-[#c6a57a]">
                  Special Note (Optional)
                </span>
              </label>

              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write any special request..."
                className="textarea w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4">
              <button
                type="button"
                className="btn bg-[#24140c] border border-[#3b2618] text-white rounded-full hover:bg-[#2e1a10]"
                onClick={() => getDialog("booking_modal").close()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn rounded-full bg-[#d89c3d] border-none text-black hover:bg-[#e4aa4b] px-8"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>

        {/* Click outside close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
