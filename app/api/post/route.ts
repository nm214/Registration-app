export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in API:", err);
    return new Response("Failed to post to JSONPlaceholder", { status: 500 });
  }
}
