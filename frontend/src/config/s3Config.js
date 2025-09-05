// S3 Configuration for DACANTOURS
const S3_BUCKET_NAME = 'dacantoursbacket';
const S3_REGION = 'us-east-2'; // Update this to your actual region
const S3_BASE_URL = `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com`;

// S3 URLs for all assets
export const S3_ASSETS = {
  // Images
  images: {
    logo: `${S3_BASE_URL}/assets/images/logo.jpg`,
    kyrgyzstanPreview: `${S3_BASE_URL}/assets/images/kyrgyzstan_preview_-_coming_soon.jpg`,
    alaskaNorthernLights: `${S3_BASE_URL}/assets/images/alaska_northern_lights__wilderness.webp`,
    canyonsAdventure: `${S3_BASE_URL}/assets/images/canyons_adventure.jpg`,
    hawaiiOahuAdventure: `${S3_BASE_URL}/assets/images/hawaii_oahu_adventure.jpg`,
    westCoastNationalParks: `${S3_BASE_URL}/assets/images/west_coast_national_parks.jpg`,
    customAdventure: `${S3_BASE_URL}/assets/images/custom_adventure_-_your_way.jpg`,
  },
  
  // CSS and JS (for future use)
  css: `${S3_BASE_URL}/assets/css/`,
  js: `${S3_BASE_URL}/assets/js/`,
};

// Helper function to get S3 URL for any asset
export const getS3Url = (path) => {
  return `${S3_BASE_URL}/${path}`;
};

// Helper function to get image URL by filename
export const getImageUrl = (filename) => {
  return `${S3_BASE_URL}/assets/images/${filename}`;
};

export default S3_ASSETS;
