export const normalizeArticleSlug = function slugify(title?: string): string | null {
  if (!title) {
    return null;
  }

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};
