

export async function fetchAsteroids(date: string) {
  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      start_date: date,
      end_date: date,
    });

    // Fetch data from the Flask API
    const response = await fetch(`http://localhost:1000/asteroids?${queryParams}`);

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Error fetching asteroid data: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    return null; // Return null or handle the error as needed
  }
}

export async function fetchAstronautsInSpace() {
    try {
      const response = await fetch("http://localhost:2000/astronauts"); // URL of your new /space route
      if (!response.ok) {
        throw new Error("Failed to fetch space data");
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching space data:", error);
      return null; // Handle error gracefully
    }

}

export async function fetchDonkiNotifications(type = "all") {
  try {
    // Call the /donki-notifications endpoint on your Express backend
    const response = await fetch(`http://localhost:3000/donki-notifications?type=${type}`);

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch DONKI notifications");
    }

    // Parse the JSON response from the server
    const data = await response.json();

    // Return the data from the server
    return data;

  } catch (error) {
    // Log any errors to the console and return null for graceful error handling
    console.error("Error fetching DONKI notifications:", error);
    return null;
  }
}

export async function fetchMarsWeather() {
  try {
    // Call the /mars-weather endpoint on your Express backend
    const response = await fetch("http://localhost:4000/mars-weather");

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch Mars weather data");
    }

    // Parse the JSON response from the server
    const data = await response.json();

    // Return the data from the server
    return data;
  } catch (error) {
    // Log any errors to the console and return null for graceful error handling
    console.error("Error fetching Mars weather data:", error);
    return null;
  }
}