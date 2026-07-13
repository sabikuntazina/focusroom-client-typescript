'use client';

import { authClient } from "@/lib/auth-client";
import { getDialog } from "@/lib/dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Room, MutationResponse } from "@/types";

export default function DeleteRoomModal({ room }: { room: Room }) {
  const router = useRouter();
  const modalId = `cancel_modal_${room._id}`;

  const handleCancel = async () => {
    const { data: tokenData } = await authClient.token();

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
    const res = await fetch(
      `${serverUrl}/rooms/${room._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );

    const data: MutationResponse = await res.json();
    if (data.deletedCount && data.deletedCount > 0) {
      toast.success("Room Deleted successfully!");
      router.push("/my-listings");
      getDialog(modalId).close();
    }
  };

  return (
    <>
      <button
        className="btn rounded-full btn-outline btn-error hover:text-white px-6"
        onClick={() => getDialog(modalId).showModal()}
      >
        Delete
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-xl bg-[#140b05] border border-[#3b2618] rounded-[32px] text-white p-0 overflow-hidden">
          <div className="border-b border-[#2d1b11] p-8">
            <p className="uppercase tracking-[4px] text-sm text-red-400 mb-2">
              Warning
            </p>

            <h3 className="text-4xl font-serif text-[#f8f1e7]">
              Delete Room?
            </h3>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-red-950/30 border border-red-800 rounded-2xl p-5">
              <p className="text-red-200 leading-relaxed">
                Are you sure you want to Delete this Room Permanently? This
                action cannot be undone.
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-2">
              <button
                type="button"
                className="btn bg-[#24140c] border border-[#3b2618] text-white rounded-full hover:bg-[#2e1a10]"
                onClick={() => getDialog(modalId).close()}
              >
                Close
              </button>

              <button
                onClick={handleCancel}
                className="btn rounded-full bg-red-600 border-none text-white hover:bg-red-700 px-8"
              >
                Confirm Delete
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
