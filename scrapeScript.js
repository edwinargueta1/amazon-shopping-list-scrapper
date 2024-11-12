import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

export async function updateListData() {
  try {
    const data = await readJSONFile("./src/list.json");

    const updatePromises = data.products
      .map(async (e) => {
        const scrapedData = await getAmazonProductData(e.link);
        return { ...e, ...scrapedData };
      });

    data.products = await Promise.all(updatePromises);
    data.timeUpdated = new Date().toUTCString();

    await writeJSONFile("./src/list.json", data);
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
    if(error.code === "ENOENT"){
      console.warn(`File not found: Creating ${filePath}.`);
      return [];
    }else{
      console.error("Error reading JSON file:", error);
      throw error;
    }
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
    const scrapedPriceAndSale = formatPrice($("div.a-section.a-spacing-none.aok-align-center.aok-relative span.aok-offscreen").first().text().trim());
    scrapedData.name = $("#productTitle").text().trim();
    scrapedData.price = scrapedPriceAndSale[0];
    scrapedData.sale =  scrapedPriceAndSale[1];
    scrapedData.rating = $("div#averageCustomerReviews span.a-size-base.a-color-base").first().text().trim();
    scrapedData.ratingCount = $("div#averageCustomerReviews span#acrCustomerReviewText").first().text().trim();
    scrapedData.coupon = formatCoupon($("div#promoPriceBlockMessage_feature_div span.promoPriceBlockMessage span.a-color-success label").length ? $("div#promoPriceBlockMessage_feature_div span.promoPriceBlockMessage span.a-color-success label").first().text().trim() : "");
    scrapedData.image = $("#imgTagWrapperId img").attr("src");
    scrapedData.primePrice = $("div#pep_feature_div span#primeExclusivePricingMessage span.a-size-base").length ? $("div#pep_feature_div span#primeExclusivePricingMessage span.a-size-base").first().text().trim() : "";
    
    return scrapedData;
  } catch (error) {
    console.error("Error scraping data from Amazon:", error);
    throw error;
  }
}
function formatPrice(string){
  const arr = string.split(" ").filter((e)=>{
    return e !== "";
  });
  return [arr[0], arr[2] ? `-${arr[2]}%` : ""]
}
function formatCoupon(str){
  const res = str.split(" ");
  return res[1];
}

function couponDiscountedPrice(discount, amount){
  if (!discount || amount <= 0) return "";

  if(discount.includes("%")){
      const  percentage = Math.abs(parseInt(discount))/100;
      return amount * (1 - percentage);
  }
  return amount - Math.abs(parseInt(discount));
}
updateListData();