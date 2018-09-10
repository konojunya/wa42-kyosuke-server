const express = require("express");
const app = express();
const axios = require("axios");
const parseString = require('xml2js').parseString;

// load dot env
require('dotenv').config();

app.get("/", (req, res) => {
  res.json({
    "hello": "world"
  })
})

app.listen("3000")