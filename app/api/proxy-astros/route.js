// /app/api/proxy-astros/route.js

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request) {
  const url = "http://api.open-notify.org/astros.json"

  try {
    const response = await fetch(url)
    const data = await response.json()
    return Response.json(data) // Send the JSON response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Failed to fetch astronaut data", { status: 500 })
  }
}
