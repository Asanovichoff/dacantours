import { useState } from 'react';
import logo from '../assets/logo.jpg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="DACANTOURS Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#tours" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                US Tours
              </a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
              <a href="#kyrgyzstan" className="text-purple-400 hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-purple-900/50 rounded-lg">
                🚀 Kyrgyzstan
              </a>
            </div>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
            <a href="#home" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="#tours" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
              US Tours
            </a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </a>
            <a href="#kyrgyzstan" className="text-purple-400 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium bg-purple-900/50">
              🚀 Kyrgyzstan
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
