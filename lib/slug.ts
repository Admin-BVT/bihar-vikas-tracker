export function toSlug(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, "-");
}

export function fromSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .toLowerCase();
}
