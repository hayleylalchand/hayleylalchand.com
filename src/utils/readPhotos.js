import { promises as fs } from "fs";
import path from "path";

export async function readPhotos(directory) {
  const dirPath = path.join("public", directory);
  const files = await fs.readdir(dirPath);
  return files.map((file) => `/${directory}/${file}`);
}
