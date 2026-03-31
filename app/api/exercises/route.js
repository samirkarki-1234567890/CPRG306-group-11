import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "14";

  try {
    const response = await fetch(
      `https://wger.de/api/v2/exercise/?format=json&language=2&category=${category}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}