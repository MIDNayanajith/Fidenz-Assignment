import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/weather-logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="WeatherSense Logo"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[#2196F3]"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#2196F3]">
                WeatherSense
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/login">
              <button className="bg-gradient-to-r from-[#2196F3] to-[#AFDDFF] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                Login
              </button>
            </Link>
          </div>
          <button
            className="md:hidden text-gray-700 hover:text-[#2196F3] transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg py-4 animate-slide-down">
            <div className="flex flex-col gap-4 px-4">
              <Link to="/login">
                <button className="bg-gradient-to-r from-[#2196F3] to-[#AFDDFF] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
