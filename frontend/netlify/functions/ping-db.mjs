export default async function (event, context) {
  const API_URL = "https://sport-market.onrender.com";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.text();

    return new Response(JSON.stringify({ message: "API is awake", result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error pinging API:", error);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
