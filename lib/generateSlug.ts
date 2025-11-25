export function generateSlug(text: string | FormDataEntryValue | null) {
  if (!text) return "";

  const words = text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // hapus simbol aneh
    .split(/\s+/); // pisah pakai spasi

  // Jika hanya 1 kata, langsung return
  if (words.length === 1) return words[0];

  // Jika lebih dari 1 kata, gabungkan dengan "-"
  return words.join("-");
}
