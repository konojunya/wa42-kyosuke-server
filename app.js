const express = require("express");
const app = express();
const axios = require("axios");

// load dot env
require('dotenv').config();

const getRestaurant = async ({ lat, lon }) => {
  console.log(process.env)
  try {
    const res = await axios.get("https://api.gnavi.co.jp/RestSearchAPI/v3/", {
      params: {
        keyid: process.env.API_KEY,
        latitude: lat,
        longitude: lon,
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

const getWeather = async ({ lat, lon }) => {
  try {
    const res = await axios.get(`http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&APPID=${process.env.OEPN_WEATHER}`)
    return res.data.list[0].weather[0]
  } catch(e) {
    throw e;
  }
}

app.use((req, res, next) => {
  const { lat, lon } = req.query;
  if(!lat || !lon) {
    res.sendStatus(400)
    return;
  } else {
    next();
  }
})

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/restaurant", async  (req, res) => {
  try {
    const rests = await getRestaurant(req.query);
    res.status(200);
    res.json(rests);
  } catch(e) {
    res.status(e.response.status);
    res.json(e.response);
  }
})

app.get("/api/weather", async  (req, res) => {
  try {
    const weather = await getWeather(req.query);
    res.status(200);
    res.json(weather);
  } catch(e) {
    res.status(e.response.status);
    res.json(e.response);
  }
})

app.listen("3000")