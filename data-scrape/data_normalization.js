const rp = require("request-promise");
const fs = require("fs");

const options = {
  uri:
    "https://api.apify.com/v1/execs/HDeTet6FW6Q726oeD/results?format=json&simplified=1",
  json: true
};

function numberConverter(value) {
  return Number(value);
}

const normalize = data => {
  return data.filter(keepValid).map(normalizeValues);
};

const requiredFields = ["price", "location", "title"];
const keepValid = (item, index) => {
  if (
    requiredFields.some(field => {
      return typeof item[field] === "undefined";
    })
  ) {
    return false;
  }
  return true;
};

const normalizeValues = (item, index) => {
  return {
    ...item,
    size: {
      parcel_m2: item.size.parcel_m2,
      gross_m2: numberConverter(item.size.gross_m2),
      net_m2: item.size.net_m2,
      rooms: numberConverter(item.size.rooms)
    },
    price: {
      value: numberConverter(item.price.value.replace(/[^\d]/g, "")),
      currency: "EUR"
    }
  };
};

function writeToJson(normalizedData) {
  fs.writeFileSync("./result.json", JSON.stringify(normalizedData));
}

(async () => {
  try {
    const data = await rp(options);
    console.log("data: ", data[0]);
    console.log("data length : ", data.length);
    let normalizedData = normalize(data);
    await writeToJson(normalizedData);
    console.log("normalize: ", normalizedData[0]);
    console.log("normalize length: ", normalizedData.length);
  } catch (err) {
    console.log(err);
  }
})();
