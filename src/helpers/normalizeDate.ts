export const normalizeDate = (rawDate: string): string => {
  const date = new Date(rawDate);

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
