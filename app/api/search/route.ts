import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 300_000, // 5 minutes — full entries can take 90–180 seconds to generate
});

function toSlug(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const slug = toSlug(query);

    // Return cached entry immediately if it exists
    const { data: existing } = await supabaseAdmin
      .from("entries")
      .select("*")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json(existing);
    }

    // Generate new entry via Claude
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: query }],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    let content: Record<string, unknown>;
    try {
      content = JSON.parse(rawText);
    } catch {
      // Try to extract JSON if there is any surrounding text or partial truncation
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) {
        return NextResponse.json(
          { error: "Failed to parse AI response", raw: rawText.slice(0, 200) },
          { status: 500 }
        );
      }
      content = JSON.parse(match[0]);
    }

    const entry = {
      slug,
      content,
      subject_type: content.subject_type as string,
      region: content.region as string,
      decade: content.decade as string,
      country: content.country as string,
      mood_tags: content.mood_tags as string[],
      genre_tags: content.genre_tags as string[],
      title: content.title as string,
    };

    const { data: saved, error: saveError } = await supabaseAdmin
      .from("entries")
      .insert(entry)
      .select()
      .single();

    if (saveError) {
      console.error("Supabase save error:", saveError);
      // Still return the generated content even if saving failed
      return NextResponse.json(entry);
    }

    return NextResponse.json(saved);
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
