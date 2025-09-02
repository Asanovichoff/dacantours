// Import all tour images
import canyonsAdventure from '../assets/canyons_adventure.jpg';
import alaskaNorthernLights from '../assets/alaska_northern_lights__wilderness.webp';
import hawaiiOahuAdventure from '../assets/hawaii_oahu_adventure.jpg';
import westCoastNationalParks from '../assets/west_coast_national_parks.jpg';
import kyrgyzstanPreview from '../assets/kyrgyzstan_preview_-_coming_soon.jpg';
import customAdventure from '../assets/custom_adventure_-_your_way.jpg';

// Map tour titles to their imported images
const tourImages = {
  'Canyons Adventure': canyonsAdventure,
  'Alaska Northern Lights & Wilderness': alaskaNorthernLights,
  'Hawaii Oahu Adventure': hawaiiOahuAdventure,
  'West Coast National Parks': westCoastNationalParks,
  'Kyrgyzstan Preview - Coming Soon!': kyrgyzstanPreview,
  'Custom Adventure - Your Way': customAdventure,
};

/**
 * Get the local image URL for a tour
 * @param {string} tourTitle - The title of the tour
 * @returns {string} - The local image URL
 */
export const getTourImage = (tourTitle) => {
  return tourImages[tourTitle] || null;
};

/**
 * Check if an image URL is a local asset
 * @param {string} imageUrl - The image URL to check
 * @returns {boolean} - True if it's a local asset
 */
export const isLocalImage = (imageUrl) => {
  return imageUrl && imageUrl.startsWith('/src/assets/');
};

/**
 * Get the correct image URL (local or external)
 * @param {string} tourTitle - The tour title
 * @param {string} imageUrl - The image URL from database
 * @returns {string} - The correct image URL to use
 */
export const getImageUrl = (tourTitle, imageUrl) => {
  // If we have a local image for this tour, use it
  const localImage = getTourImage(tourTitle);
  if (localImage) {
    return localImage;
  }
  
  // Otherwise, use the URL from database (fallback to external)
  return imageUrl;
};
