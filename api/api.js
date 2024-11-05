import config from '../config/config';

export async function fetchData(endpoint, options = {}) {
  try {
    // Send request to backend URL with provided endpoint
    const response = await fetch(`${config.API_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Interpret response as JSON
    const jsonData = await response.json();
    return jsonData;
  } 
  catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}
