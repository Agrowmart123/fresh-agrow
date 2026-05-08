import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MapPin,
  Store,
  User,
  Search,
  ChevronDown,
  Menu,
  X,
  Heart,
  ShoppingBag,
  Bell,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useLocation } from "../context/LocationContext";
import LocationPicker from "./LocationPicker";
import { useWishlist } from "../context/WishlistContext";
import logo from "../../public/agfresh.jpeg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { location, setLocation } = useLocation();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [openDropdown, setOpenDropdown] = useState(false);

  const [search, setSearch] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileLocationOpen, setMobileLocationOpen] = useState(false);

  const locationRef = useRef(null);
  const mobileLocationRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const placeholders = [
    "Search fruits...",
    "Search vegetables...",
    "Search local products...",
    "Search pulses...",
    "Search dairy products...",
    "Search meat & seafood...",
    "Search fertilizers...",
    "search seefood...",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Close desktop location on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setOpenLocation(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenu(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu or search overlay is open
  useEffect(() => {
    if (mobileMenu || mobileSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu, mobileSearch]);

  // Auto focus search input when overlay opens
  useEffect(() => {
    if (mobileSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [mobileSearch]);

  // Close search overlay on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMobileSearch(false);
      }
    }
    if (mobileSearch) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileSearch]);

  const handleLogout = () => {
    logout();
    setOpenDropdown(false);
    setMobileMenu(false);
    navigate("/login");
  };

  const handleSearchSubmit = () => {
    // Handle search submit — add your navigation logic here
    // e.g. navigate(`/search?q=${search}`)
    setMobileSearch(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, []);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20 py-3">
        <div className="max-w-[90%] mx-auto px-2 md:px-3 flex items-center justify-between">
          {" "}
          {/* LEFT: LOGO + NAME */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/agfresh.jpeg"
                alt="AgrowFresh"
                className="h-10 w-auto rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-1.5xl font-bold text-[#68911a] leading-tight">
                  AgrowFresh
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: SEARCH BAR */}
          <div className="hidden md:flex items-center border-2 border-[#68911a] rounded-xl overflow-hidden w-1/3 focus-within:border-[#68911a] transition-all">
            <div className="relative flex-1 overflow-hidden h-full flex items-center">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 outline-none text-sm"
              />
            </div>
          </div>

          {/* RIGHT: ICONS + MOBILE MENU */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="md:hidden p-2 rounded-md bg-[#68911a] text-white"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden md:flex items-center gap-4">
              <span className="text-gray-700 font-semibold text-sm">Namaste!</span>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bg-[#68911a] text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden bg-white shadow-md p-4">
            <Link to="/" className="block py-2 text-gray-700">Home</Link>
            <Link to="/about" className="block py-2 text-gray-700">About</Link>
            <Link to="/contact" className="block py-2 text-gray-700">Contact</Link>
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="block w-full text-left py-2 text-[#68911a] font-semibold"
            >
              Enquiry
            </button>
          </div>
        )}
      </nav>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded max-w-2xl w-full p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Enquiry</h3>
              <button
                onClick={() => setEnquiryModalOpen(false)}
                className="text-gray-500"
              >
                Close
              </button>
            </div>
            <form
              className="mt-4"
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

                const whatsappLink = "https://wa.me/message/C5R5O6R7CDKVN1";

                window.open(`${whatsappLink}?text=${message}`, "_blank");
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product
                </label>
                <input
                  type="text"
                  id="product"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Required Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#68911a] focus:border-[#68911a] sm:text-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#68911a] text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Enhancements */}
      <style jsx>{`
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }
          .navbar .search-bar {
            width: 100%;
            margin-top: 1rem;
          }
          .navbar .menu {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
