// Import types if needed, or define them here
export interface DONKINotification {
  messageType: string;
  messageID: string;
  messageURL: string;
  messageIssueTime: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For any additional fields
}

export interface EnrichedDONKINotification extends DONKINotification {
  fullName: string;
  description: string;
}

// Message type details mapping
const messageTypeDetails: Record<string, { fullName: string; description: string }> = {
  FLR: { fullName: "Solar Flare", description: "An intense burst of radiation from the sun." },
  SEP: { fullName: "Solar Energetic Particle", description: "High-energy particles emitted by the sun during solar events." },
  CME: { fullName: "Coronal Mass Ejection", description: "A large expulsion of plasma and magnetic field from the sun's corona." },
  IPS: { fullName: "Interplanetary Shock", description: "A shock wave caused by solar wind or coronal mass ejections." },
  MPC: { fullName: "Magnetopause Crossing", description: "A crossing of the Earth's magnetopause boundary." },
  GST: { fullName: "Geomagnetic Storm", description: "A disturbance in Earth's magnetosphere caused by solar wind." },
  RBE: { fullName: "Radiation Belt Enhancement", description: "Increased particle density in Earth's radiation belts." },
  HSS: { fullName: "High-Speed Stream", description: "A fast stream of solar wind originating from coronal holes." },
  report: { fullName: "Report", description: "General space weather report or analysis." },
  all: { fullName: "All Types", description: "Includes all types of space weather notifications." },
};

// Function to fetch and enrich DONKI notifications
export async function fetchDONKINotifications(type: string = "all"): Promise<EnrichedDONKINotification[] | null> {
  const nasaApiUrl = "https://api.nasa.gov/DONKI/notifications";
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY; // Use a public environment variable for client-side use

  // Get today's date in 'yyyy-MM-dd' format
  const today = new Date().toISOString().split("T")[0];

  try {
    const response = await fetch(
      `${nasaApiUrl}?startDate=${today}&endDate=${today}&type=${type}&api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching DONKI notifications: ${response.statusText}`);
    }

    const data: DONKINotification[] = await response.json();

    // Enrich the data with full names and descriptions
    const enrichedData: EnrichedDONKINotification[] = data.map((notification) => {
      const details = messageTypeDetails[notification.messageType] || {};
      return {
        ...notification,
        fullName: details.fullName || "Report",
        description: details.description || "General space weather report or analysis.",
      };
    });

    return enrichedData;
  } catch (error) {
    console.error("Error fetching DONKI notifications:", error);
    return null; // Return null in case of an error
  }
}
