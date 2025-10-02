// Static data utilities for GitHub Pages deployment
// This replaces the dynamic API calls with static JSON file loading

// Content API Functions - now reads from static JSON files
export const getPageContent = async (pageName) => {
  try {
    // For GitHub Pages, we need to handle the subdirectory structure
    const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    const possiblePaths = [
      `${baseUrl}/data/${pageName}.json`,
      `/data/${pageName}.json`,
      `./data/${pageName}.json`,
      `${process.env.PUBLIC_URL || ''}/data/${pageName}.json`,
      `${window.location.origin}/data/${pageName}.json`,
      `${window.location.origin}/Portfolio/data/${pageName}.json`
    ];
    
    console.log(`Attempting to load ${pageName} content...`);
    console.log('Base URL:', baseUrl);
    console.log('Possible paths:', possiblePaths);
    
    let response;
    let lastError;
    
    for (const path of possiblePaths) {
      try {
        console.log(`Trying path: ${path}`);
        response = await fetch(path);
        if (response.ok) {
          console.log(`Success! Loaded from: ${path}`);
          break;
        } else {
          console.log(`Failed with status: ${response.status}`);
        }
      } catch (error) {
        lastError = error;
        console.log(`Error with path ${path}:`, error.message);
        continue;
      }
    }
    
    if (!response || !response.ok) {
      console.error(`Failed to load ${pageName} content from any path. Last error: ${lastError?.message || 'No response'}`);
      console.error('Attempted paths:', possiblePaths);
      throw new Error(`Failed to load ${pageName} content from any path. Last error: ${lastError?.message || 'No response'}`);
    }
    
    const data = await response.json();
    console.log(`Successfully loaded ${pageName} content from:`, response.url);
    return data;
  } catch (error) {
    console.error(`Error loading ${pageName} content:`, error);
    // Return default content structure if file doesn't exist
    return {
      pageName,
      title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
      description: `Information about ${pageName}`,
      sections: [{
        title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
        text: `This is the ${pageName} page. Content will be loaded from static files.`,
        order: 0
      }],
      lastUpdated: new Date().toISOString()
    };
  }
};

// Legacy function for backward compatibility - now returns a promise that resolves immediately
export const updatePageContent = async (pageName, content) => {
  console.warn('updatePageContent is not available in static mode. Content must be updated manually in the JSON files.');
  return Promise.resolve(content);
};

// Auth functions are disabled for static deployment
export const loginAdmin = async (credentials) => {
  console.warn('Admin login is not available in static mode.');
  return Promise.resolve({ success: false, message: 'Admin features not available in static mode' });
};

export const checkAdmin = async () => {
  return Promise.resolve({ isAdmin: false });
};

export const logoutAdmin = async () => {
  return Promise.resolve({ success: true });
};

// Legacy getBaseUrl function - no longer needed for static files
export const getBaseUrl = () => {
  return '';
}; 