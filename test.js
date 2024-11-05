import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("./src/list.json", "utf8"));


const updatePromises = data.map(async (e, i) => {
    if (i > 0) return;
  
    if (!e.name || !e.image || !e.price) {
      console.log("in loop", e.name, e.image, e.price, !e.name || !e.image || !e.price);
      const scrapedData = await getAmazonProductData(e.link);
      Object.assign(e, scrapedData);
    }
});
console.log(updatePromises, data);

await Promise.all(updatePromises);
updateList(data);


async function getAmazonProductData(targetURL){
    const scrapedData = {};
    const webData = await axios.get(targetURL);

    const $ = cheerio.load(webData.data);
    scrapedData.name = $("#productTitle").text().trim();
    scrapedData.price = $("#corePriceDisplay_desktop_feature_div .aok-offscreen").first().text().trim();
    scrapedData.image = $("#imgTagWrapperId img").attr("src");

    console.log(scrapedData);

    return scrapedData;
}

function updateList(list){
  const jsonList = JSON.stringify(list);
  console.log(jsonList);

  fs.writeFileSync("./src/list.json", jsonList, "utf-8");
  console.log("Data has been Updated");
}

console.log("Data Info Final: ", data);