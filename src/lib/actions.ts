"use server";

import { revalidatePath } from "next/cache";
import type { MutationResponse } from "@/types";

export const deleteRoomAction = async (roomId: string) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const res = await fetch(
    `${serverUrl}/rooms/${roomId}`,
    {
      method: "DELETE",
    }
  );

  const data: MutationResponse = await res.json();
  if (data.deletedCount && data.deletedCount > 0) {
    revalidatePath("/my-listings");
  }

  return {
    success: true,
    data,
  };
};
