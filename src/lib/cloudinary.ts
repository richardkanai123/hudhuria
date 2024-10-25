import { Cloudinary } from '@cloudinary/url-gen';
export const myCld = new Cloudinary({
  cloud: {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
        apiKey: import.meta.env.VITE_CLOUD_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUD_API_SECRET,
  }
});


 