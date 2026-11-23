function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Turn stored article text into HTML. Posts saved as plain lines stay as separate paragraphs. */
export function blogContentHtml(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "";
  if (/<(p|h[1-6]|ul|ol|li|br|div|blockquote)\b/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}
