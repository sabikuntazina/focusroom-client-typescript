'use client';

import { authClient } from "@/lib/auth-client";
import { getDialog } from "@/lib/dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Room, MutationResponse } from "@/types";
import type { ChangeEvent } from "react";

interface EditRoomForm {
  roomName: string;
  description: string;
  floor: string;
  image: string;
  hourlyRate: number;
  capacity: number;
  availability: boolean;
}

export default function EditRoomModal({ room }: { room: Room }) {
  const modalId = `edit_${room._id}`;
const router=useRouter();
  const [form, setForm] = useState<EditRoomForm>({
    roomName: room.roomName || "",
    description: room.description || "",
    floor: room.floor || "",
    image: room.image || "",
    hourlyRate: room.hourlyRate || 0,
    capacity: room.capacity || room.seatCapacity || 0,
    availability: room.availability ?? false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
const {data:tokenData} = await authClient.token();
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
    const res = await fetch(
      `${serverUrl}/rooms/${room._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
           'authorization': `Bearer ${tokenData?.token}`,
         },
        body: JSON.stringify(form),
      }
    );

    const data: MutationResponse = await res.json();

    if (data.modifiedCount && data.modifiedCount > 0) {
      toast.success("Room updated successfully");
      router.push(`/rooms/${room._id}`);
      getDialog(modalId).close();
    } else {
      toast.error("No changes detected");
    }
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => getDialog(modalId).showModal()}
        className="btn rounded-full bg-[#d89d33] hover:bg-[#ebb247] border-none text-black px-6"
      >
        Edit Room
      </button>

      {/* MODAL */}
      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-4xl bg-base-200 text-base-content rounded-3xl shadow-2xl p-0">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#1e1711] to-[#2a1b12] p-6 border-b border-[#3a2417] rounded-t-3xl">
            <h3 className="text-3xl font-bold text-[#f8f1e7]">
              Edit Room Details
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Update your room information and save changes
            </p>
          </div>

          {/* BODY */}
          <form onSubmit={handleUpdate} className="p-6 space-y-6">

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT SIDE */}
              <div className="space-y-4">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Room Name</span>
                  </label>
                  <input
                    name="roomName"
                    value={form.roomName}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-base-100"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full bg-base-100 h-32"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Floor</span>
                    </label>
                    <input
                      name="floor"
                      value={form.floor}
                      onChange={handleChange}
                      className="input input-bordered bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Capacity</span>
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                      className="input input-bordered bg-base-100"
                    />
                  </div>
                </div>
             {/* AVAILABILITY */}
<div className="form-control">
  <label className="label">
    <span className="label-text">Availability</span>
  </label>

  <div className="flex items-center justify-between bg-base-100 border border-base-300 rounded-xl px-4 py-3">
    
    <span className="text-sm text-gray-400">
      {form.availability ? "Available" : "Unavailable"}
    </span>

    <input
      type="checkbox"
      name="availability"
      checked={form.availability}
      onChange={(e) =>
        setForm({
          ...form,
          availability: e.target.checked,
        })
      }
      className="toggle toggle-warning"
    />
  </div>
</div>

              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-base-100"
                  />
                </div>

                {/* preview */}
                {form.image && (
                  <div className="rounded-2xl overflow-hidden border border-base-300">
                    <img
                      src={form.image}
                      alt="preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hourly Rate ($)</span>
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={form.hourlyRate}
                    onChange={handleChange}
                    className="input input-bordered bg-base-100"
                  />
                </div>
                

              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t border-base-300">

              <button
                type="button"
                onClick={() => getDialog(modalId).close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn bg-[#d89d33] hover:bg-[#ebb247] text-black border-none"
              >
                Save Changes
              </button>

            </div>

          </form>
        </div>

        {/* BACKDROP */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}