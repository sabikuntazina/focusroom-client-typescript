import BookingCancelModal from '@/components/BookingCancelModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: "FocusRoom-My-Bookings",
  description: "Find Your Perfect Focus Zone",
};

const MyBookingsPage =async () => {
  const session = await auth.api.getSession({
    headers: await headers() 
})

const user= session?.user;
// console.log(user)
const {token}= await auth.api.getToken({
    headers: await headers()
  })
  // console.log(token)

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res =await fetch(`${serverUrl}/bookings/${user?.id}`,   {
      headers:{
        authorization: `Bearer ${token}`
       
      }
    }
);
  const bookings =await res.json();
  // console.log(bookings)
  const today = new Date();
  const bookingsArray = Array.isArray(bookings) ? bookings : [];
  return (
    <div>
     <div className="min-h-screen max-w-6xl mx-auto bg-[#0b0502] text-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="uppercase tracking-[4px] text-sm text-[#b28b5c] mb-2">
          Reservations
        </p>

        <h1 className="text-5xl font-serif text-[#f8f1e7]">
          My Bookings
        </h1>
      </div>

      {/* Empty State */}
      {bookingsArray.length === 0 ? (
        <div className="bg-[#140b05] border border-[#3b2618] rounded-[32px] p-14 text-center">
          <h2 className="text-3xl font-serif text-[#f8f1e7] mb-4">
            You have no bookings yet.
          </h2>

          <p className="text-gray-400 mb-8">
            Start exploring study rooms and reserve your
            focus zone.
          </p>

          <Link
            href="/rooms"
            className="btn rounded-full bg-[#d89c3d] border-none text-black hover:bg-[#e4aa4b] px-8"
          >
            Browse Rooms
          </Link>
        </div>
      ) : (
       <div className="overflow-x-auto rounded-[32px] border border-[#3b2618] bg-[#110c08]">
  <table className="table table w-full">
    {/* head */}
    <thead>
      <tr className="text-[#c6a57a] text-lg border-b border-[#3b2618]">
        <th>Room</th>
        <th>Date</th>
        <th>Time</th>
        <th>Cost</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {bookingsArray.map((booking) => {
        const bookingDate = new Date(booking.bookingDate);

        const canCancel =
          booking.status === "confirmed" &&
          bookingDate >= today;

        return (
          <tr
  key={booking._id}
  className="hover:bg-[#1b1009] border-b border-[#2b1a11] text-base"
>
            {/* Room */}
            <td>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-24 rounded-2xl">
                    <Image
                      src={booking.roomImg}
                      alt={booking.roomName}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <div className="font-bold text-[#f8f1e7] text-xl">
                    <Link href={`/rooms/${booking.roomId}`}>
                    {booking.roomName}
                    </Link>
                  </div>
                </div>
              </div>
            </td>

            {/* Date */}
            <td className="text-white">
              {new Date(
                booking.bookingDate
              ).toLocaleDateString()}
            </td>

            {/* Time */}
            <td className="text-white">
              {booking.startTime} - {booking.endTime}
            </td>

            {/* Cost */}
            <td className="text-[#e6b04d] font-semibold">
              ${booking.totalCost}
            </td>

            {/* Status */}
            <td>
              <div
                className={`badge border-none text-white ${
                  booking.status === "confirmed"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {booking.status}
              </div>
            </td>

            {/* Action */}
            <td>
              {canCancel && (
                <BookingCancelModal booking={booking} />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
      )}
    </div>
    </div>
  );
};

export default MyBookingsPage;