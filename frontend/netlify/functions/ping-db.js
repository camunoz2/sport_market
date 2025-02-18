export default async function (event, context) {
  const API_URL = "https://sport-market.onrender.com";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    // Optionally, process the response:
    const result = await response.text();
    console.log("Successfully pinged API:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "API is awake", result }),
    };
  } catch (error) {
    console.error("Error pinging API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
}
