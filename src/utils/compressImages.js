import sharp from "sharp";
import fs from "fs";
import path from "path";

console.log("Starting the compression script...");

// Define the source and destination directories
const srcDir = path.join("public/photography");
const destDir = path.join("public/photography-compressed");

// Create the destination directory and any necessary subdirectories if they don't exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
};

ensureDirExists(destDir);

(async () => {
  try {
    console.log("Reading files...");
    const files = fs
      .readdirSync(srcDir)
      .filter((file) => /\.(jpg|jpeg|png)$/.test(file));
    console.log(`Found ${files.length} files`);

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(srcDir, file);
        const outputFilePath = path.join(
          destDir,
          file.replace(/\.(jpg|jpeg|png)$/, ".webp")
        );

        try {
          console.log(`Processing file: ${filePath}`);
          await sharp(filePath)
            .resize(800, 600, {
              fit: sharp.fit.inside,
              withoutEnlargement: true,
            })
            .toFormat("webp")
            .webp({ quality: 80 })
            .toFile(outputFilePath);

          console.log(
            `Compressed and converted ${filePath} to ${outputFilePath}`
          );
        } catch (err) {
          console.error(`Error processing ${filePath}:`, err);
        }
      })
    );

    console.log("All images compressed and converted.");
  } catch (err) {
    console.error("Error reading files:", err);
  }
})();
