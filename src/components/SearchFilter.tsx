import Link from "next/link";
import type { SearchFilterProps } from "@/types";

const SearchFilter = ({
  defaultSearch,
  defaultAmenities,
  defaultMinPrice,
  defaultMaxPrice,
}: SearchFilterProps) => {
  return (
    <form
      action="/rooms"
      className="bg-[#140b05] border border-[#3b2618] rounded-[32px] p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        {/* Search */}
        <div className="xl:col-span-2">
          <label className="label">
            <span className="label-text text-[#c6a57a]">Search Room</span>
          </label>

          <input
            type="text"
            name="search"
            defaultValue={defaultSearch}
            placeholder="Search by room name..."
            className="input w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="label">
            <span className="label-text text-[#c6a57a]">Amenities</span>
          </label>

          <select
            name="amenities"
            defaultValue={defaultAmenities}
            className="select w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
          >
            <option value="">All Amenities</option>
            <option value="Wi-Fi">Wi-Fi</option>
            <option value="Quiet Zone">Quiet Zone</option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Power Outlets">Power Outlets</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="label">
            <span className="label-text text-[#c6a57a]">Min Price</span>
          </label>

          <input
            type="number"
            name="minPrice"
            defaultValue={defaultMinPrice}
            placeholder="$10"
            className="input w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="label">
            <span className="label-text text-[#c6a57a]">Max Price</span>
          </label>

          <input
            type="number"
            name="maxPrice"
            defaultValue={defaultMaxPrice}
            placeholder="$100"
            className="input w-full bg-[#1c120c] border border-[#3b2618] rounded-2xl text-white focus:outline-none focus:border-[#d89c3d]"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-end mt-6">
        <Link
          href="/rooms"
          className="btn bg-[#24140c] border border-[#3b2618] text-white rounded-full hover:bg-[#2e1a10]"
        >
          Reset
        </Link>

        <button
          type="submit"
          className="btn rounded-full bg-[#d89c3d] border-none text-black hover:bg-[#e4aa4b] px-8"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default SearchFilter;
