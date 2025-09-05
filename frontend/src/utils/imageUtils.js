// Import S3 configuration
import { S3_ASSETS } from '../config/s3Config';

// Map tour titles to their S3 image URLs
const tourImages = {
  'Canyons Adventure': S3_ASSETS.images.canyonsAdventure,
  'Alaska Northern Lights & Wilderness': S3_ASSETS.images.alaskaNorthernLights,
  'Hawaii Oahu Adventure': S3_ASSETS.images.hawaiiOahuAdventure,
  'West Coast National Parks': S3_ASSETS.images.westCoastNationalParks,
  'Kyrgyzstan Preview - Coming Soon!': S3_ASSETS.images.kyrgyzstanPreview,
  'Custom Adventure - Your Way': S3_ASSETS.images.customAdventure,
};

/**
 * Get the S3 image URL for a tour
 * @param {string} tourTitle - The title of the tour
 * @returns {string} - The S3 image URL
 */
export const getTourImage = (tourTitle) => {
  return tourImages[tourTitle] || null;
};

/**
 * Check if an image URL is an S3 asset
 * @param {string} imageUrl - The image URL to check
 * @returns {boolean} - True if it's an S3 asset
 */
export const isS3Image = (imageUrl) => {
  return imageUrl && imageUrl.includes('dacantoursbacket.s3');
};

/**
 * Get the correct image URL (S3 or external)
 * @param {string} tourTitle - The tour title
 * @param {string} imageUrl - The image URL from database
 * @returns {string} - The correct image URL to use
 */
export const getImageUrl = (tourTitle, imageUrl) => {
  // If we have an S3 image for this tour, use it
  const s3Image = getTourImage(tourTitle);
  if (s3Image) {
    return s3Image;
  }
  
  // Otherwise, use the URL from database (fallback to external)
  return imageUrl;
};
