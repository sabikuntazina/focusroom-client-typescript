export type Amenity =
  | "Whiteboard"
  | "Projector"
  | "Wi-Fi"
  | "Power Outlets"
  | "Quiet Zone"
  | "Air Conditioning"
  | "Coffee Corner"
  | "Natural Lighting"
  | "Smart TV"
  | "Meeting Desk"
  | "Private Booth"
  | "Soundproof Room";

export interface Room {
  _id: string;
  roomName: string;
  description: string;
  floor: string;
  image: string;
  hourlyRate: number;
  seatCapacity: number;
  capacity?: number;
  availability: boolean;
  amenities: string[];
  ratings?: number;
  location?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userImg?: string;
}

export interface Booking {
  _id: string;
  roomId: string;
  roomName: string;
  roomImg: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  status: "confirmed" | "cancelled";
  note?: string;
  userId?: string;
  userName?: string;
}

export interface MutationResponse {
  modifiedCount?: number;
  deletedCount?: number;
  insertedId?: string | null;
  message?: string;
}

export interface CreateRoomPayload {
  roomName: string;
  description: string;
  floor: string;
  image: string;
  hourlyRate: number;
  capacity: number;
  userName: string;
  userEmail: string;
  userImg?: string;
  userId?: string;
  amenities: string[];
}

export interface SearchFilterProps {
  defaultSearch?: string;
  defaultAmenities?: string;
  defaultMinPrice?: string;
  defaultMaxPrice?: string;
}
