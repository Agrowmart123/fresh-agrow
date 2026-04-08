import React, { useEffect, useState } from "react";

import CategoryGrid from "../components/CategoryGrid";
import { IMAGES } from "../data/images";
import { farmers } from "../data/farmers";
import ShopHighlightCard from "../components/ShopHighlightCard";
import FarmerCard from "../components/FarmerCard";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const sampleShops = [
  {
    id: "s1",
    name: "Green Grocery",
    description: "Fresh vegetables",
    rating: 4.5,
    deliveryTime: 30,
    image: IMAGES.shop1,
    offer: "10% OFF",
    distance: "0.8 km",
  },
  {
    id: "s2",
    name: "Dairy Delight",
    description: "Milk & dairy",
    rating: 4.2,
    deliveryTime: 25,
    image: IMAGES.shop2,
    offer: "Free delivery",
    distance: "1.2 km",
  },
  {
    id: "s3",
    name: "Farm Tools",
    description: "Tools for agriculture",
    rating: 4.6,
    deliveryTime: 40,
    image: IMAGES.shop3,
    offer: "Save ₹50",
    distance: "0.6 km",
  },
];

const banners = [
  {
    title: "Collected From Gardens",
    offer: "Great offers",
    image: IMAGES.FooterImg,
    gradient: "from-green-500 to-green-600",
    textColor: "text-white",
    buttonColor: "text-green-600",
  },
  {
    title: "Change Your Diet Plan",
    offer: "Add Some Fruits",
    image: IMAGES.dairy,
    gradient: "from-lime-300 to-lime-400",
    textColor: "text-gray-800",
    buttonColor: "text-gray-800",
  },
  {
    title: "Vegetable 100% Organic",
    offer: "From Farms",
    image: IMAGES.veg,
    gradient: "from-orange-400 to-orange-500",
    textColor: "text-white",
    buttonColor: "text-orange-500",
  },
  
];

export default function Home() {
  const navigate = useNavigate();
  const [activeProductTab, setActiveProductTab] = useState("All");
  const [activeBanner, setActiveBanner] = useState(0);

  const filteredProducts = [];

  const scrollToBanner = (index) => {
    const scroller = document.getElementById("banners-scroller");
    if (scroller) {
      scroller.scrollTo({
        left: index * scroller.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const left = document.getElementById("discover-left");
    const right = document.getElementById("discover-right");
    const scroller = document.getElementById("discover-scroller");
    if (!scroller) return;
    function leftClick() {
      scroller.scrollBy({ left: -320, behavior: "smooth" });
    }
    function rightClick() {
      scroller.scrollBy({ left: 320, behavior: "smooth" });
    }
    left?.addEventListener("click", leftClick);
    right?.addEventListener("click", rightClick);
    return () => {
      left?.removeEventListener("click", leftClick);
      right?.removeEventListener("click", rightClick);
    };
  }, []);

  useEffect(() => {
    const left = document.getElementById("popular-left");
    const right = document.getElementById("popular-right");
    const scroller = document.getElementById("popular-scroller");
    if (!scroller) return;
    function leftClick() {
      scroller.scrollBy({ left: -320, behavior: "smooth" });
    }
    function rightClick() {
      scroller.scrollBy({ left: 320, behavior: "smooth" });
    }
    left?.addEventListener("click", leftClick);
    right?.addEventListener("click", rightClick);
    return () => {
      left?.removeEventListener("click", leftClick);
      right?.removeEventListener("click", rightClick);
    };
  }, []);

  useEffect(() => {
    const scroller = document.getElementById("banners-scroller");
    if (!scroller) return;

    const handleScroll = () => {
      const bannerWidth = scroller.clientWidth;
      const index = Math.round(scroller.scrollLeft / bannerWidth);
      setActiveBanner(index % banners.length);
    };

    scroller.addEventListener("scroll", handleScroll);

    let index = 0;

    const interval = setInterval(() => {
      const bannerWidth = scroller.clientWidth;

      index++;

      scroller.scrollTo({
        left: index * bannerWidth,
        behavior: "smooth",
      });

      if (index >= banners.length) {
        setTimeout(() => {
          scroller.scrollTo({
            left: 0,
            behavior: "auto",
          });
          index = 0;
        }, 600);
      }
    }, 4000);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const left = document.getElementById("farmers-left");
    const right = document.getElementById("farmers-right");
    const scroller = document.getElementById("farmers-scroller");

    if (!scroller) return;

    function leftClick() {
      scroller.scrollBy({ left: -320, behavior: "smooth" });
    }

    function rightClick() {
      scroller.scrollBy({ left: 320, behavior: "smooth" });
    }

    left?.addEventListener("click", leftClick);
    right?.addEventListener("click", rightClick);

    return () => {
      left?.removeEventListener("click", leftClick);
      right?.removeEventListener("click", rightClick);
    };
  }, []);

  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <div>
      <main className="max-w-6xl mx-auto p-4 pt-8">
        {/* Promotional Banners Section */}
        <section className="mb-12 ">
          <div className="relative">
            <div
              id="banners-scroller"
              className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
            >
              {[...banners, ...banners].map((banner, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full md:w-1/2 bg-gradient-to-br ${banner.gradient}
          rounded-xl flex overflow-hidden min-h-52 transform transition duration-300
          hover:scale-[1.02] hover:shadow-xl group`}
                >
                  {/* TEXT */}
                  <div
                    className={`w-1/2 p-6 flex flex-col justify-center ${banner.textColor}`}
                  >
                    <p className="text-sm font-semibold mb-2">{banner.offer}</p>

                    <h3 className="text-2xl md:text-2xl font-bold mb-4">
                      {banner.title}
                    </h3>

                  
                  </div>

                  {/* IMAGE */}
                  <div className="w-1/2 overflow-hidden">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToBanner(index)}
                  className={`w-1.5 h-1.5 rounded-full transition ${
                    activeBanner === index
                      ? "bg-[#68911a] scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Farmers Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Farmers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {farmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                farmer={farmer}
                onClick={() => {
                  // Open enquiry modal
                  setSelectedFarmer(farmer);
                  setEnquiryModalOpen(true);
                }}
              />
            ))}
          </div>
        </section>

        {/* Enquiry Modal */}
        {enquiryModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h3 className="text-xl font-bold text-gray-800">Enquiry</h3>
                <button
                  onClick={() => setEnquiryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-2"
                >
                  ✕
                </button>
              </div>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = document.getElementById("name").value;
                  const phone = document.getElementById("phone").value;
                  const address = document.getElementById("address").value;
                  const product = document.getElementById("product").value;
                  const quantity = document.getElementById("quantity").value;
                  const date = document.getElementById("date").value;
                  const description = document.getElementById("description").value;

                  const message = `New Enquiry:%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AProduct: ${product}%0AQuantity: ${quantity}%0ARequired Date: ${date}%0ADescription: ${description}`;

                  const whatsappUrl = `https://api.whatsapp.com/send?phone=8007810076&text=${message}`;

                  window.open(whatsappUrl, "_blank");
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    id="address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                    placeholder="Enter your address"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product
                    </label>
                    <input
                      type="text"
                      id="product"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                      placeholder="Enter the product (e.g., Mango, Vegetables)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                      placeholder="Enter the quantity (e.g., 10kg, 1 ton)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#68911a] focus:border-[#68911a] text-gray-800"
                    placeholder="Enter any additional details"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#68911a] text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
