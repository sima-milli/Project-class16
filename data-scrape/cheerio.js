// Not finished yet

const cheerio = require("cheerio");
const rp = require("request-promise");
const fs = require("fs");

const list_url = "https://www.green-acres.pt/casa-em-venda/lisboa-freguesia";

const searchResultItemSelector = ".border-bottom-1";

rp(list_url)
  .then(htmlContent => {
    console.log("htmlContent: ", htmlContent);
    const $ = cheerio.load(htmlContent);
    const searchResult = $(".property-tile").text();
    console.log(searchResult);
  })
  .catch(err => console.log(err));
