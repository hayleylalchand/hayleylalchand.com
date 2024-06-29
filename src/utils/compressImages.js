import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { glob } from "glob";

// Define the source and destination directories
const srcDir = path.join("public/photography");
const destDir = path.join("public/photography-compressed");

// Create the destination directory and any necessary subdirectories if they don't exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirExists(destDir);

const globPromise = promisify(glob);

(async () => {
  try {
    const files = await globPromise(`${srcDir}/*.{jpg,jpeg,png}`);

    await Promise.all(
      files.map(async (file) => {
        const fileName = path.basename(file);
        const outputFilePath = path.join(
          destDir,
          fileName.replace(/\.(jpg|jpeg|png)$/, ".webp")
        );

        try {
          await sharp(file)
            .resize(800, 600, {
              fit: sharp.fit.inside,
              withoutEnlargement: true,
            })
            .toFormat("webp")
            .webp({ quality: 80 })
            .toFile(outputFilePath);

          console.log(`Compressed and converted ${file} to ${outputFilePath}`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err);
        }
      })
    );

    console.log("All images compressed and converted.");
  } catch (err) {
    console.error("Error reading files:", err);
  }
})();
