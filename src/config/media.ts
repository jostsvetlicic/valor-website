/**
 * VALOR — media config.
 *
 * Videos are driven by a single `mode` value each: "mp4" plays the local file,
 * "loom" swaps in a Loom embed. That one value is the only change needed to
 * drop in a real video later — nothing in the component changes.
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
    "Ninety seconds on what we build — the frontend that sells, the automation behind it, and the systems that finally connect.",
};

/**
 * The "How it works" walkthrough — a Loom recording of a real build. The slot
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
