const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const exchangeAsset = require("./../models/exchangeAsset");
const  CronJob = require('cron').CronJob;
const job =new CronJob('0 */5 * * * *', function() {
  catchAsync(async (req, res, next) => {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/exchange/assets?id=270",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINTMAKET_API_KEY,
        },
      }
    );
    const exchangeInfo = response.data;
    const extactedData = exchangeInfo.data.map((object) => {
      const { wallet_address, balance, platform, currency } = object;
      return { wallet_address, balance, platform, currency };
    });
    const exchangeData = await exchangeAsset.create(extactedData);
    if (exchangeData) {
      res.status(200).json({ message: "Data saved successfully" });
    } else {
      res.status(500).json({ message: "Failed to save data" });
    }
  });
})
 job.start();
