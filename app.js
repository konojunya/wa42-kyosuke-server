const express = require("express");
const app = express();
const axios = require("axios");
const parseString = require('xml2js').parseString;

// load dot env
require('dotenv').config();

const getRestaurant = async () => {
  try {
    const res = await axios.get("https://api.gnavi.co.jp/RestSearchAPI/v3/", {
      params: {
        keyid: process.env.API_KEY,
        latitude: 34.702485,
        longitude: 135.495951,
        range: 5
      }
    })
    return res.data.rest.map(r => ({
      name: r.name,
      name_kana: r.name_kana,
      category: r.category,
      url: r.url,
      url_mobile: r.url_mobile,
      image_url: r.image_url,
      address: r.address,
      tel: r.tel
    }))
  } catch(e) {
    throw e
  }
}

const getWeather = async () => {
  try {
    const res = await axios.get();
    console.log(res.data)
  } catch(e) {
    throw e;
  }
}

// app.get("/api/all", async  (req, res) => {
//   try {
//     const rests = await getRestaurant();
//     res.status(200);
//     res.json(rests);
//   } catch(e) {
//     res.status(e.response.status);
//     res.json(e.response);
//   }
// })

// app.listen("3000")