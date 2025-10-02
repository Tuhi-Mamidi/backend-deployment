const axios = require("axios");
const cheerio = require("cheerio");
const MarketPrice = require("../model/scrapmodel.js");
const translate = require('google-translate-api-x');
function formatDate(date = new Date()) {
 const day = String(date.getDate()).padStart(2, "0"); // 01, 02, ..., 31
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = monthNames[date.getMonth()].toLowerCase(); // lowercase: jan, feb, sep
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const scrap = async (req, res) => {
  try {
    const today = formatDate(); 
    console.log(today);
    const url = `https://www.napanta.com/te/market-price/andhra-pradesh/krishna/tiruvuru/${today}`;
    

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let results = [];

    const rows = $("table tbody tr");

for (let i = 0; i < rows.length; i++) {
  const tds = $(rows[i]).find("td");
  const commod = $(tds[0]).text().trim();

  const commodity_te = await translate(commod, { to: 'te' })
                            .then(r => r.text)
                            .catch(() => commod);

  results.push({
    commodity: commodity_te,
    maxPrice: $(tds[2]).text().trim(),
    avgPrice: $(tds[3]).text().trim(),
    minPrice: $(tds[4]).text().trim(),
    date: today,
  });
}


    
    await MarketPrice.deleteMany({ date: { $ne: today } });

   
    await MarketPrice.insertMany(results);

    res.json({ message: "Scraped & saved today's market prices", data: results });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Error scraping market prices" });
  }
};
module.exports={scrap};
/*const rows = $("table tbody tr");

for (let i = 0; i < rows.length; i++) {
  const tds = $(rows[i]).find("td");
  const commod = $(tds[0]).text().trim();

  const commodity_te = await translate(commod, { to: 'te' })
                            .then(r => r.text)
                            .catch(() => commod);

  results.push({
    commodity: commodity_te,
    maxPrice: $(tds[2]).text().trim(),
    avgPrice: $(tds[3]).text().trim(),
    minPrice: $(tds[4]).text().trim(),
    date: today,
  });
}*/