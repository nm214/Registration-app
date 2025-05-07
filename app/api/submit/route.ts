import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.json();

  const response = await fetch(
    "https://6808ca28942707d722dfc712.mockapi.io/forms/forms",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
