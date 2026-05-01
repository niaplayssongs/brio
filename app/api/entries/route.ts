import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const decade = searchParams.get("decade");
    const region = searchParams.get("region");
    const mood = searchParams.get("mood");
    const subject_type = searchParams.get("subject_type");

    let query = supabaseAdmin
      .from("entries")
      .select("id, slug, title, subject_type, region, decade, country, mood_tags, genre_tags, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (decade) query = query.eq("decade", decade);
    if (region) query = query.eq("region", region);
    if (mood) query = query.contains("mood_tags", [mood]);
    if (subject_type) query = query.eq("subject_type", subject_type);

    const { data, error } = await query;

    if (error) {
      console.error("Entries fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("Entries API error:", err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
