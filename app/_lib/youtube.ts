/** แปลงลิงก์ YouTube ทุกแบบ → video id */
export function extractYoutubeVideoId(url: string): string | null {
  const raw = url.trim();
  if (!raw) return null;

  const patterns = [
    /studio\.youtube\.com\/video\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const re of patterns) {
    const m = raw.match(re);
    if (m?.[1]) return m[1];
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
  return null;
}

export function youtubeWatchUrl(url: string): string {
  const id = extractYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url.trim();
}

/** URL สำหรับฝังเล่นในหน้า (ไม่พาไป youtube.com) */
export function youtubeEmbedUrl(url: string, opts?: { autoplay?: boolean }): string | null {
  const id = extractYoutubeVideoId(url);
  if (!id) return null;
  const q = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (opts?.autoplay) q.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}
