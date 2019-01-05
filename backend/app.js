const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("../DB/config");
const cors = require("cors");
const {
  validateData,
  normalizeRowData,
  urlData
} = require("./data_normalization");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, please search a city to display");
});
app.get("/searchData", (req, res) => {
  const city = req.query.city || null;
  let queryWhere = "";

  if (city) {
    queryWhere = `WHERE location_city = "${city}"`;
  }
  dbConnection.query(
    `SELECT * FROM property ${queryWhere};`,
    (err, result, fields) => {
      if (err) {
        res.status(400).end();
      }
      res.json({ result });
    }
  );
});
app.get("/allCities", (req, res) => {
  dbConnection.query(
    `SELECT location_city, COUNT(*) count FROM property GROUP BY location_city;`,
    (err, result, fields) => {
      if (err) {
        res.status(400).end();
      }
      res.json({ result });
    }
  );
});
app.get("/cityChart", (req, res) => {
  const city = req.query.city;
  dbConnection.query(
    `SELECT DATEDIFF(CURDATE(), market_date) AS days, SUM(price_value) AS sum, COUNT(*) AS count FROM property 
  WHERE location_city = '${city}' AND DATEDIFF(CURDATE(), market_date) <= 10 GROUP BY market_date ORDER BY days;`,
    (err, result, fields) => {
      if (err) {
        res.status(400).end();
      }
      res.json({ result });
    }
  );
});

app.post("/uploadData/json", (req, res) => {
  try {
    const data = validateData(req.body);

    const validData = data.filter(item => item.error === null);
    res
      .json({
        processed: data.length,
        valid: validData.length,
        failed: data.filter(item => item.error !== null).length,
        details: data.filter(item => item.error !== null)
      })
      .end();

    const normalizedData = validData.map(normalizeRowData);
    if (normalizedData.length) {
      let values = [];
      normalizedData.map((data, i) => {
        const {
          url,
          market_date,
          sold,
          location,
          size,
          price,
          images,
          description,
          title
        } = data;
        const imagesSrc = images.join();

        values[i] = [
          url,
          new Date(market_date),
          sold,
          location.country,
          location.city,
          location.address,
          location.coordinates.lat,
          location.coordinates.lng,
          0,
          size.gross_m2,
          0,
          size.rooms,
          price.value,
          price.currency,
          title,
          description,
          imagesSrc
        ];
      });

      dbConnection.query(
        `REPLACE INTO property (URL, market_date, sold, location_country, location_city ,location_address, location_coordinates_lat, location_coordinates_lng, size_parcelm2, size_grossm2, size_netm2, size_rooms, price_value, price_currency, title, description, images) VALUES ?`,
        [values],
        (err, result, fields) => {
          if (err) {
            throw err;
          }
          console.log("Data inserted successfully", result);
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }

  res.end();
});
app.post("/uploadData/url", (req, res) => {
  try {
    const { link } = req.body;
    urlData(link).then(data => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});
app.use("*", (req, res) => {
  res.json({ message: "404 page not found!" });
});

const port = process.env.PORT || 3121;

dbConnection.connect(function(err) {
  if (err != null) {
    console.error("error connecting: " + err.stack);
    return;
  }

  app.listen(port, () => {
    console.log(
      `DB connected on ${
        dbConnection.threadId
      }, running at http://localhost:${port}`
    );
  });
});
