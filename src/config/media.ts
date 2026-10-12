/**
 * VALOR, media config.
 *
 * Videos are driven by a single `mode` value each: "mp4" plays the local file,
 * "loom" swaps in a Loom embed. That one value is the only change needed to
 * drop in a real video later, nothing in the component changes.
 */

export type VideoMode = "mp4" | "loom";

export type VideoConfig = {
  mode: VideoMode;
  mp4: string;
  poster: string;
  loomUrl: string;
  caption: string;
};

/** The homepage welcome video (raised panel, caption to the side). */
export const welcomeVideo: VideoConfig = {
  // >>> SWITCH HERE: "mp4" | "loom" <<<
  mode: "mp4",
  mp4: "/video/call.mp4",
  poster: "/video/call-poster.jpg",
  // Paste a Loom embed URL (https://www.loom.com/embed/<id>) and set mode to
  // "loom" to use it instead of the local file.
  loomUrl: "",
  caption:
    "Ninety seconds on what we build: the frontend that sells, the automation behind it, and the systems that finally connect.",
};

/**
 * The "How it works" walkthrough, a Loom recording of a real build. The slot
 * is HIDDEN ENTIRELY while `loomUrl` is empty. Paste a Loom embed URL to switch
 * it on; nothing else changes.
 * // TODO: real content required
 */
export const walkthroughVideo: VideoConfig = {
  mode: "loom",
  mp4: "",
  poster: "",
  loomUrl: "",
  caption: "A short walkthrough of a real build, start to finish.",
};

/**
 * Homepage "Welcome to VALOR" and "See it in action" slots. While both `mp4`
 * and `loomUrl` are empty the slot shows a placeholder box with a play icon.
 * Fill one in (and set `mode` to match) to make it play, nothing else changes.
 * // TODO: real content required
 */
export const introVideo: VideoConfig = {
  mode: "loom",
  mp4: "",
  poster: "",
  loomUrl: "",
  caption: "",
};

export const demoVideo: VideoConfig = {
  mode: "loom",
  mp4: "",
  poster: "",
  loomUrl: "",
  caption: "",
};

/**
 * Homepage welcome film (native player, right after the logo strip). The
 * files below are placeholders. // TODO: real content required, add
 * /public/video/welcome.mp4, a real poster frame and real subtitles.
 */
// Rendered from ~/Documents/Valor/Content/video-projects/valor-welcome-enterprise
// (out/deliverables). Subtitles are generated from its src/script.json.
// TODO: the music bed ("Bubbles Drop", Cosmonkey) has an unverified licence,
// clear it or swap the track before this goes live.
export const welcomeFilm = {
  src: "/video/welcome.mp4",
  webm: "/video/welcome.webm",
  poster: "/video/welcome-poster.webp",
  subtitles: { en: "/video/welcome.en.vtt", sl: "/video/welcome.sl.vtt" },
  caption: {
    en: "What VALOR does, in 40 seconds.",
    sl: "Kaj dela VALOR, v 40 sekundah.",
  },
};
