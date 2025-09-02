import { useState } from 'react';
import { getImageUrl } from '../utils/imageUtils';

const TourCard = ({ tour, onInterestClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="group relative bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 animate-pulse flex items-center justify-center">
            <div className="text-blue-400 text-4xl">🏔️</div>
          </div>
        )}
        
        {/* Tour Image */}
        <img 
          src={getImageUrl(tour.title, tour.image_url)} 
          alt={tour.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
        
        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Price Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
          tour.title === "Custom Adventure - Your Way" 
            ? 'bg-purple-600 text-white' 
            : 'bg-blue-600 text-white'
        }`}>
          {tour.title === "Custom Adventure - Your Way" ? "Custom" : `$${tour.price}`}
        </div>
        
        {/* Difficulty Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
          tour.difficulty === 'Easy' ? 'bg-green-500 text-white' :
          tour.difficulty === 'Moderate' ? 'bg-yellow-500 text-white' :
          tour.difficulty === 'Custom' ? 'bg-purple-500 text-white' :
          'bg-red-500 text-white'
        }`}>
          {tour.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {tour.title}
          </h3>
          <div className="flex items-center text-gray-300 mb-2">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{tour.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {tour.description}
        </p>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-300">
            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Max {tour.max_group_size}</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          type="button"
          onClick={() => onInterestClick(tour)}
          className={`w-full text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group ${
            tour.title === "Custom Adventure - Your Way"
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          }`}
        >
          <span className="mr-2">{tour.title === "Custom Adventure - Your Way" ? "Design My Trip" : "Details"}</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform"></span>
        </button>
      </div>

      {/* Hover Effect Border (non-interactive) */}
      <div className={`pointer-events-none absolute inset-0 border-2 border-blue-500 rounded-2xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default TourCard;
