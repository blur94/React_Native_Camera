import path from "path";

export const videoExtensions = [".mp4", ".m4v", ".mov"];

export type MediaType = "video" | "image";

export const getMediaType = (uri: string): MediaType =>
  videoExtensions.includes(path.extname(uri)) ? "video" : "image";
