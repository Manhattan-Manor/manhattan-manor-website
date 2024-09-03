export function htmlDecode(content: string): string {
  const doc = new DOMParser().parseFromString(content, "text/html");
  return doc.documentElement.textContent || "";
}

export const parseDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
