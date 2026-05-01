import { supabaseAdmin } from "@/lib/supabase";
import EntryDisplay from "./EntryDisplay";
import GenerateEntry from "./GenerateEntry";

export default async function EntryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = params;

  // Try to load from database on the server side first
  const { data: entry } = await supabaseAdmin
    .from("entries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (entry) {
    return <EntryDisplay entry={entry} />;
  }

  // Not in the database — hand off to the client component for generation
  const rawQ = searchParams.q;
  const query =
    typeof rawQ === "string" && rawQ.trim()
      ? rawQ
      : slug.replace(/-/g, " ");

  return <GenerateEntry slug={slug} query={query} />;
}
