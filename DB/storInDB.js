const dbConnection = require("./config");
const jsondata = require("../result.json");

jsondata.forEach((el, i) => {
  const property = {
    URL: el.url,
    location_country: el.location.country,
    location_city: el.location.city,
    location_address: el.location.address,
    location_coordinates_lat: el.location.coordinates.lat,
    location_coordinates_lng: el.location.coordinates.lng,
    size_grossm2: el.size.gross_m2,
    size_rooms: el.size.rooms,
    price_value: el.price.value,
    price_currency: el.price.currency,
    title: el.title,
    description: el.description,
    images: el.images.join()
  };
  dbConnection.query("INSERT INTO property SET ?", property, function(
    err,
    results,
    fields
  ) {
    if (err) {
      console.log(err);
    }
    console.log("File inserted successfully");
  });
});
