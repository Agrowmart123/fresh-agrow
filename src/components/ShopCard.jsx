import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ShopCard({ shop }) {
  return (
    <Link to={`/shop/${shop.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm"
      >
        {/* Shop Image */}
        <div className="relative">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-48 object-cover"
          />

          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3 bg-[#68911a] text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
            ⭐ {shop.rating || "4.8"}
          </div>
        </div>

        {/* Shop Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {shop.name || "Hindustan Vegetables"}
          </h3>

          {/* Distance */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            📍 <span>{shop.distance || "1.5 km"}</span>
          </div>

          {/* Closing time */}
          <div className="flex items-center gap-2 text-orange-500 text-sm mt-1">
            ⏰ Closing soon
            <span className="text-gray-500">at {shop.closingTime || "08:00 PM"}</span>
          </div>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-3">
          Free Delivery above ₹{shop.freeDelivery || "260"}
        </div>
      </motion.div>
    </Link>
  );
}