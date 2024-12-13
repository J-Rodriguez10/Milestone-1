/* eslint-disable @typescript-eslint/no-unused-vars */
export async function GET(request) {
  const externalApiUrl = "http://api.open-notify.org/astros.json"; 

  try {
    // Forward the GET request to the external HTTP API
    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        // Forward headers if necessary
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Return the response to the client
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

