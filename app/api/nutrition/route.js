import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "banana";

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=5`,
      {
        headers: {
          "User-Agent": "FitTrack/1.0"
        }
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}