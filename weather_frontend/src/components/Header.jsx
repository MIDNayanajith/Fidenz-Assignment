import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/weather-logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2196F3] to-[#AFDDFF] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://source.unsplash.com/random/1920x1080/?weather,clouds')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 max-w-md md:max-w-lg w-full mx-4 text-center transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col items-center gap-6">
          <img
            src={logo}
            alt="WeatherSense Logo"
            className="h-24 w-24 rounded-full object-cover ring-4 ring-[#2196F3] shadow-md"
          />
          <div>
            <h1 className="text-4xl font-bold text-[#2196F3] mb-2">
              WeatherSense
            </h1>
            <p className="text-lg text-gray-600">
              Discover comfort in every forecast
            </p>
          </div>
          <div className="hidden md:block">
            <button
              onClick={() => loginWithRedirect()}
              className="bg-gradient-to-r from-[#2196F3] to-[#AFDDFF] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-lg"
            >
              Get Started - Login
            </button>
          </div>
          <button
            className="md:hidden text-black hover:text-[#2196F3] transition-colors cursor-pointer absolute top-4 right-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-6 animate-slide-down">
            <button
              onClick={() => loginWithRedirect()}
              className="bg-gradient-to-r from-[#2196F3] to-[#AFDDFF] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer w-full text-lg"
            >
              Get Started - Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
