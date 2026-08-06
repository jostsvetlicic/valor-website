/**
 * VALOR — media config.
 *
 * The homepage welcome video. Switch `mode` between "mp4" (the local file)
 * and "loom" (an embed URL) — that ONE value is the only change needed to
 * swap in a real, on-camera video later. Nothing in the component changes.
 */

export type VideoMode = "mp4" | "loom";

export const welcomeVideo: {
  mode: VideoMode;
  mp4: string;
  poster: string;
  loomUrl: string;
  caption: string;
} = {
  // >>> SWITCH HERE: "mp4" | "loom" <<<
  mode: "mp4",

  // Local compressed file (served from /public).
  mp4: "/video/call.mp4",
  poster: "/video/call-poster.jpg",

  // Paste a Loom embed URL (https://www.loom.com/embed/<id>) and set mode to
  // "loom" to use it instead of the local file.
  loomUrl: "",

  // One line, shown beside the video — what it covers.
  caption:
    "Ninety seconds on what we build — the frontend that sells, the automation behind it, and the systems that finally connect.",
};
