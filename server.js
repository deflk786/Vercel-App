const axios = require('axios');

// List of app URLs to keep alive
const urls = [
  'https:/drivemail-ten.vercel.app/',
  'https://newntchfdygsdfgdfg.vercel.app',

  // Add more URLs as needed
];

// Function to ping all URLs
const pingApps = async () => {
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      console.log(`Pinged ${url} successfully at ${new Date()}: Status ${response.status}`);
    } catch (error) {
      console.error(`Error pinging ${url}: ${error.message}`);
    }
  }
};

// Ping all apps every 5 minutes
setInterval(pingApps, 2 * 60 * 1000);

// Initial immediate ping to verify the script works
pingApps();
