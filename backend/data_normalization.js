const rp = require("request-promise");
const validator = require("validator");

const options = {
  uri:
    "https://api.apify.com/v1/execs/4BeiTQ5gLzWjXcYmN/results?format=json&simplified=1",
  json: true
};

function numberConverter(value) {
  return Number(value);
}
function imgValidator(imgArr) {
  const newImg = imgArr.filter(
    img => img !== "/Content/resources/img/logo-color.png"
  );
  return newImg;
}

const requiredFields = ["url", "price", "title", "market_date"];

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
  console.log("data: ", data);

  return {
    ...data,
    market_date: data.market_date.replace(/[^\d]/g, "-"),
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
// (async () => {
//   try {
//     const data = await rp(options);
//     // console.log("data: ", data[0]);
//     console.log("data length : ", data.length);
//     let normalizedData = normalize(data);
//     // console.log("normalizedData: ", normalizedData[0]);
//     // await writeToJson(normalizedData);
//     console.log("normalize length: ", normalizedData.length);
//   } catch (err) {
//     console.log(err);
//   }
// })();
