import { IMAGES } from "../data/images";

import React from "react";
import { MapPin, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FarmerCard({ farmer, onClick }) {
  return (
    <div
      className="w-80 h-full bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Cover Image */}
      <div className="h-20 bg-gray-200 overflow-hidden">
        <img
          src={farmer.coverImage}
          alt="farm"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Profile + Name */}
        <div className="flex gap-4">
          {/* Profile Image */}
          <div className="-mt-12 flex-shrink-0">
            <div className="bg-white rounded-full shadow">
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#68911a]"
              />
            </div>
          </div>

          {/* Name + Location */}
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-900">{farmer.name}</h3>

            <div className="flex items-center gap-1 text-sm w-full">
              <MapPin size={16} className="text-[#68911a] flex-shrink-0" />

              <span className="text-gray-500 font-semibold truncate max-w-[140px]">
                {" "}
                {farmer.location}
              </span>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={onClick}
          className="mt-4 bg-[#68911a] text-white px-4 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
