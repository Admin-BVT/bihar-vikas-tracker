import { supabasePublic } from '@/lib/supabasePublic'

export default async function sitemap() {
  const baseUrl = "https://biharvikastracker.in"

  // Fetch projects
  const { data: projects } = await supabasePublic
    .from('projects')
    .select('id')

  // Fetch districts
  const { data: districts } = await supabasePublic
    .from('projects')
    .select('district')

  // Fetch categories
  const { data: categories } = await supabasePublic
    .from('projects')
    .select('category')

  // Unique districts
  const uniqueDistricts = Array.from(
    new Set(districts?.map(d => d.district).filter(Boolean))
  )

  // Unique categories
  const uniqueCategories = Array.from(
    new Set(categories?.map(c => c.category).filter(Boolean))
  )

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/districts`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },

    // District pages
    ...uniqueDistricts.map((d) => ({
      url: `${baseUrl}/districts/${d
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
      lastModified: new Date(),
    })),

    // Category pages
    ...uniqueCategories.map((c) => ({
      url: `${baseUrl}/categories/${c
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
      lastModified: new Date(),
    })),

    // Project pages (MOST IMPORTANT)
    ...(projects?.map((p) => ({
      url: `${baseUrl}/projects/p/${p.id}`,
      lastModified: new Date(),
    })) || []),
  ]
}