/** URL fragment for a menu item, e.g. "The House Cup" → "the-house-cup". */
export function menuSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
