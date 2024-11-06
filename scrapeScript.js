import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

export async function updateListData() {
  try {
    const data = await readJSONFile("./src/list.json");

    const updatePromises = data
      .map(async (e) => {
        const scrapedData = await getAmazonProductData(e.link);
        return { ...e, ...scrapedData };
      });

    const updatedData = await Promise.all(updatePromises);
    const newData = data.map((e) => updatedData.find(u => u.link === e.link) || e);

    await writeJSONFile("./src/list.json", newData);

    console.log("Data has been updated successfully.");
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

async function readJSONFile(filePath) {
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error;
  }
}

async function writeJSONFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf8");
  } catch (error) {
    console.error("Error writing JSON file:", error);
    throw error;
  }
}

async function getAmazonProductData(targetURL) {
  try {
    const scrapedData = {};
    const webData = await axios.get(targetURL);

    const $ = cheerio.load(webData.data);
    scrapedData.name = $("#productTitle").text().trim();
    scrapedData.price = $("div.a-section.a-spacing-none.aok-align-center.aok-relative span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay").first().text().trim();
    scrapedData.sale = $("div.a-section.a-spacing-none.aok-align-center.aok-relative span.a-size-large.a-color-price.savingPriceOverride.aok-align-center.reinventPriceSavingsPercentageMargin.savingsPercentage").first().text().trim();
    scrapedData.image = $("#imgTagWrapperId img").attr("src");

    return scrapedData;
  } catch (error) {
    console.error("Error scraping data from Amazon:", error);
    throw error;
  }
}


updateListData();