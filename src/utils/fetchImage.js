import fetch from "node-fetch";
import cheerio from "cheerio";

export async function fetchImage(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const imageUrl = $('meta[property="og:image"]').attr("content") || "";
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
}
