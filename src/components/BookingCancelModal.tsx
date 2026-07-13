'use client';

import { authClient } from "@/lib/auth-client";
import { getDialog } from "@/lib/dom";
import toast from "react-hot-toast";
import type { Booking, MutationResponse } from "@/types";

export default function BookingCancelModal({
  booking,
}: {
  booking: Booking;
  onCancel?: () => void;
}) {
  const modalId = `cancel_modal_${booking._id}`;

  const handleCancel = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
      const res = await fetch(
        `${serverUrl}/bookings/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );

      const data: MutationResponse = await res.json();

      if (data.modifiedCount && data.modifiedCount > 0) {
        toast.success("Booking cancelled successfully!");
        getDialog(modalId).close();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <button
        className="btn rounded-full btn-outline btn-error hover:text-white px-6"
        onClick={() => getDialog(modalId).showModal()}
      >
        Cancel
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-xl bg-[#140b05] border border-[#3b2618] rounded-[32px] text-white p-0 overflow-hidden">
          <div className="border-b border-[#2d1b11] p-8">
            <p className="uppercase tracking-[4px] text-sm text-red-400 mb-2">
              Warning
            </p>

            <h3 className="text-4xl font-serif text-[#f8f1e7]">
              Cancel Booking?
            </h3>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-[#1c120c] border border-[#3b2618] rounded-3xl p-5">
              <h2 className="text-2xl font-serif text-[#f8f1e7] mb-3">
                {booking.roomName}
              </h2>

              <div className="space-y-2 text-gray-300">
                <p>
                  Date:{" "}
                  <span className="text-white">{booking.bookingDate}</span>
                </p>

                <p>
                  Time:{" "}
                  <span className="text-white">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </p>

                <p>
                  Total Cost:{" "}
                  <span className="text-[#e6b04d] font-semibold">
                    ${booking.totalCost}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-red-950/30 border border-red-800 rounded-2xl p-5">
              <p className="text-red-200 leading-relaxed">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-2">
              <button
                type="button"
                className="btn bg-[#24140c] border border-[#3b2618] text-white rounded-full hover:bg-[#2e1a10]"
                onClick={() => getDialog(modalId).close()}
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                className="btn rounded-full bg-red-600 border-none text-white hover:bg-red-700 px-8"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
