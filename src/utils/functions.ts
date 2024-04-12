export function htmlDecode(content: string): string {
  const doc = new DOMParser().parseFromString(content, "text/html");
  return doc.documentElement.textContent || "";
}
