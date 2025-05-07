import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://6808ca28942707d722dfc712.mockapi.io/forms/agenda"
  );

  const data = await response.json();

  return NextResponse.json(data);
}
