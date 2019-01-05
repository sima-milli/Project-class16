const rp = require("request-promise");
const validator = require("validator");

const options = {
  uri:
    "https://api.apify.com/v1/execs/4BeiTQ5gLzWjXcYmN/results?format=json&simplified=1",
  json: true
};
const day2 =
  "https://api.apify.com/v1/execs/KY9Ez8eWkeCYRDCNy/results?format=json&simplified=1";

const day3 =
  "https://api.apify.com/v1/execs/Fwyjq9rgXvm2DoCrN/results?format=json&simplified=1";
const day4 =
  "https://api.apify.com/v1/execs/QpMcHZA7wHsSnae94/results?format=json&simplified=1";
const day5 =
  "https://api.apify.com/v1/execs/pKwxrLew2FWMYT5bt/results?format=json&simplified=1";

function numberConverter(value) {
  return Number(value);
}
function imgValidator(imgArr) {
  const newImg = imgArr.filter(
    img => img !== "/Content/resources/img/logo-color.png"
  );
  return newImg;
}

const requiredFields = ["url", "price", "title"];

const keepValid = (process, item) => {
  let error = null;

  if (
    requiredFields.some(field => {
      return typeof item[field] === "undefined";
    })
  ) {
    error = `Missing required fields from ${requiredFields}`;
  }
  if (!validator.isURL(item["url"])) {
    error = `"${item["url"]}" is not valid URL!`;
  }
  // if (isNaN(item["price"].value)) {
  //   error = `Price value ${item["price"]} should be a numeric value!`;
  // }

  process.push({
    error,
    raw: item
  });

  return process;
};

module.exports.validateData = data => {
  const processed = data.reduce(keepValid, []);
  return processed;
};

module.exports.normalizeRowData = ({ raw: data }) => {
  return {
    ...data,
    market_date: data.market_date
      ? data.market_date.replace(/[^\d]/g, "-")
      : new Date(),
    title: data.title.trim(),
    description: data.description.trim(),
    location: {
      country: data.location.country.trim(),
      city: data.location.city.trim(),
      address: data.location.address.trim(),
      coordinates: {
        lat: numberConverter(data.location.coordinates.lat),
        lng: numberConverter(data.location.coordinates.lng)
      }
    },
    size: {
      parcel_m2: numberConverter(data.size.parcel_m2),
      gross_m2: numberConverter(data.size.gross_m2),
      net_m2: numberConverter(data.size.net_m2),
      rooms: numberConverter(data.size.rooms)
    },
    price: {
      value: numberConverter(String(data.price.value.replace(/[^\d]/g, ""))),
      currency: data.price.currency
    },
    images: imgValidator(data.images)
  };
};
module.exports.urlData = url => {
  return rp(url)
    .then(repos => {
      return repos;
    })
    .catch(err => {
      console.log(err);
    });
};
