
export interface CloseApproachData {
  close_approach_date: string;
  relative_velocity: {
    kilometers_per_hour: string;
  };
  miss_distance: {
    kilometers: string;
  };
}

export interface Asteroid {
  name: string;
  estimated_diameter: {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }
  is_potentially_hazardous: boolean;
  close_approach_data: CloseApproachData;
  icon_url: string;
}

export interface AsteroidResponse {
  date: string;
  asteroids: Asteroid[];
}


// List of asteroid icons
const asteroidIcons = [
  "https://cdn-icons-png.flaticon.com/512/7480/7480279.png",
  "https://cdn-icons-png.flaticon.com/512/2530/2530826.png",
  "https://cdn-icons-png.flaticon.com/512/1083/1083545.png",
  "https://cdn-icons-png.flaticon.com/512/433/433853.png",
  "https://static.vecteezy.com/system/resources/previews/029/327/992/non_2x/asteroid-icon-design-free-png.png",
  "https://cdn-icons-png.flaticon.com/512/5821/5821231.png",
];

// Function to fetch asteroid data from NASA's API
export async function fetchAsteroids(startDate: string, endDate?: string): Promise<AsteroidResponse | null> {
  const nasaApiUrl = "https://api.nasa.gov/neo/rest/v1/feed";
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY; // Use public environment variables for client-side

  const formattedEndDate = endDate || startDate;

  try {
    // Fetch data from the NASA NEO API
    const response = await fetch(
      `${nasaApiUrl}?start_date=${startDate}&end_date=${formattedEndDate}&api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching asteroid data: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract asteroid data for the requested date range
    const nearEarthObjects = data.near_earth_objects[startDate] || [];

    const formattedData: AsteroidResponse = {
      date: startDate,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      asteroids: nearEarthObjects.map((asteroid: any) => ({
        name: asteroid.name || "N/A",
        estimated_diameter: asteroid.estimated_diameter?.kilometers || null,
        is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid || false,
        close_approach_data: {
          close_approach_date: asteroid.close_approach_data?.[0]?.close_approach_date || "N/A",
          relative_velocity: {
            kilometers_per_hour:
              asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour || "N/A",
          },
          miss_distance: {
            kilometers: asteroid.close_approach_data?.[0]?.miss_distance?.kilometers || "N/A",
          },
        },
        icon_url: asteroidIcons[Math.floor(Math.random() * asteroidIcons.length)],
      })),
    };

    return formattedData;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    return null;
  }
}
