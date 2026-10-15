/** Lowercases the text and removes its accents, so that "Teléfono" and "telefono" are equal. */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}
