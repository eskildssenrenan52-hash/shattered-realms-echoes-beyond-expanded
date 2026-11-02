// Marcos gerados por IA para os reinos que ganharam arte própria.
// URLs em Storage são duráveis no projeto; o renderer ignora a imagem até ela estar carregada.
const SOURCES: Record<string, string> = {
  relicario: '/manus-storage/async-images/5K90SWP5CEG2wAwH9sb69T/image-1.webp',
  origamia: '/manus-storage/async-images/5K90SWP5CEG2wAwH9sb69T/image-2.webp',
  leviata: '/manus-storage/async-images/5K90SWP5CEG2wAwH9sb69T/image-3.webp',
  brumavale: '/manus-storage/async-images/5K90SWP5CEG2wAwH9sb69T/image-4.webp',
  nimbaria: '/manus-storage/async-images/5K90SWP5CEG2wAwH9sb69T/image-5.webp',
  erebo: '/manus-storage/async-images/eRI804cIR8OFKJWL30BXsQ/image-1.webp',
  lunaris: '/manus-storage/async-images/eRI804cIR8OFKJWL30BXsQ/image-2.webp',
  coroa: '/manus-storage/async-images/eRI804cIR8OFKJWL30BXsQ/image-3.webp',
};

const art = new Map<string, HTMLImageElement>();
for (const [id, src] of Object.entries(SOURCES)) {
  if (typeof Image === 'undefined') continue;
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  art.set(id, image);
}

/** Desenha apenas o asset pronto; o cenário manual abaixo dele continua sendo o fallback. */
export function drawGeneratedRealmArt(c: CanvasRenderingContext2D, id: string, x: number, y: number, size: number, pulse = 1) {
  const image = art.get(id);
  if (!image || !image.complete || image.naturalWidth < 2) return false;
  const ratio = image.naturalHeight / image.naturalWidth || 1;
  const w = size, h = Math.round(size * ratio);
  c.save();
  c.globalAlpha = Math.max(0.72, Math.min(1, pulse));
  c.imageSmoothingEnabled = false;
  c.drawImage(image, Math.round(x - w / 2), Math.round(y - h + 2), w, h);
  c.restore();
  return true;
}

export const generatedRealmArtUrl = (id: string) => SOURCES[id];
