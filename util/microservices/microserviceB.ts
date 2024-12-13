export type Spacecraft = {
  craft: string // Allows any spacecraft name
  crew: string[] // Array of crew members
  icon: string // URL for the icon
}
// Interface for the data structure
export interface AstronautData {
  number_of_people: number
  spacecrafts: Spacecraft[] // Array of spacecraft objects
  message: string
}

const shuttleIcons = [
  "https://cdn-icons-png.flaticon.com/512/6989/6989388.png",
  "https://cdn-icons-png.flaticon.com/512/2909/2909710.png",
  "https://cdn-icons-png.flaticon.com/512/4657/4657691.png",
  "https://cdn-icons-png.flaticon.com/512/3594/3594735.png",
];

// Function to get a random shuttle icon
function getRandomShuttleIcon() {
  const randomIndex = Math.floor(Math.random() * shuttleIcons.length);
  return shuttleIcons[randomIndex];
}


// Define a loose interface for astroData
interface AstroData {
  people: { name: string; craft: string }[];
  number: number;
  message: string;
}
// Function to rearrange astronauts data and add icons
function rearrangeData(astroData: unknown): AstronautData {
  // Assert astroData to match the AstroData interface
  const data = astroData as AstroData;

  const groupedData = data.people.reduce((acc: { craft: string; crew: string[]; icon: string }[], person) => {
    let spacecraft = acc.find(sc => sc.craft === person.craft);

    if (!spacecraft) {
      spacecraft = {
        craft: person.craft,
        crew: [],
        icon: getRandomShuttleIcon(),
      };
      acc.push(spacecraft);
    }

    spacecraft.crew.push(person.name);
    return acc;
  }, []);

  return {
    number_of_people: data.number,
    spacecrafts: groupedData,
    message: data.message,
  };
}

// Function to fetch and process astronaut data using Vercel proxy API route
export async function fetchAstronautsInSpace(): Promise<AstronautData | null> {
  const url = "/api/proxy-astros";  // Pointing to your Vercel API route

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching astronaut data: ${response.statusText}`);
    }

    const astroData = await response.json();
    return rearrangeData(astroData);  // Assuming this is your existing function to process the data
  } catch (error) {
    console.error("Error fetching astronaut data:", error);
    return null;
  }
}