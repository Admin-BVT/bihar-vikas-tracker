import { supabasePublic } from "@/lib/supabasePublic"
import SearchClient from "./SearchClient"

export const dynamic = "force-dynamic"

export default async function SearchPage() {

  const { data: projects, error } = await supabasePublic
    .from("projects")
    .select("*")

  if (error) {
  console.error("SUPABASE ERROR:", JSON.stringify(error, null, 2))
  throw new Error(error.message)
}

  return <SearchClient projects={projects ?? []} />
}