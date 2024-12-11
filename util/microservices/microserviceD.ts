// Define the types for the Mars weather data
export interface MarsWeatherData {
  sol: string;
  temperature: {
    min: number | string;
    max: number | string;
    average: number | string;
  };
  pressure: number | string;
  wind: {
    speed: number | string;
    direction: string;
  };
  season: string;
}

// Function to fetch Mars weather data from the InSight API
export async function fetchMarsWeather(): Promise<MarsWeatherData[] | null> {
  const nasaApiUrl = "https://api.nasa.gov/insight_weather/";
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY; // Use a public environment variable for client-side use

  try {
    // Fetch data from the InSight Mars Weather API
    const response = await fetch(
      `${nasaApiUrl}?api_key=${apiKey}&feedtype=json&ver=1.0`
    );

    if (!response.ok) {
      throw new Error(`Error fetching Mars weather data: ${response.statusText}`);
    }

    const weatherData = await response.json();

    // Check if the response contains sol_keys
    if (!weatherData.sol_keys || weatherData.sol_keys.length === 0) {
      return null;
    }

    // Map over the sol keys and extract relevant data
    const formattedData: MarsWeatherData[] = weatherData.sol_keys.map((sol: string) => ({
      sol: sol,
      temperature: {
        min: weatherData[sol].AT?.mn || "N/A",
        max: weatherData[sol].AT?.mx || "N/A",
        average: weatherData[sol].AT?.av || "N/A",
      },
      pressure: weatherData[sol].PRE?.av || "N/A",
      wind: {
        speed: weatherData[sol].HWS?.av || "N/A",
        direction: weatherData[sol].WD?.most_common?.compass_point || "N/A",
      },
      season: weatherData[sol].Season || "N/A",
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching Mars weather data:", error);
    return null;
  }
}
