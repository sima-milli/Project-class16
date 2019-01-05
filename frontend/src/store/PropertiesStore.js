import { observable, action, computed, runInAction, toJS } from "mobx";

class PropertiesStore {
  @observable properties = {
    data: [],
    status: "loading...",
    cities: [],
    details: [],
    chart: []
  };

  @action showProperties(cityFromInput = null) {
    this.properties.data = [];
    this.properties.status = "loading...";
    this.loadProperties(cityFromInput)
      .then(properties => {
        runInAction(() => {
          this.properties.data = properties.result;
          this.properties.status = "done";
        });
      })
      .catch(err => (this.properties.status = "error"));
  }
  @action showCities() {
    this.loadCities()
      .then(cities => {
        runInAction(() => {
          this.properties.cities = cities.result;
        });
      })
      .catch(err => console.log(err));
  }
  @action createProperty(jsonFromText, jsonFromUrl) {
    this.properties.status = "loading...";
    if (jsonFromText) {
      this.postProperty(jsonFromText)
        .then(result => {
          runInAction(() => {
            this.properties.details.push(result);
            this.properties.status = "done";
          });
        })
        .catch(err => (this.properties.status = "error"));
    } else {
      console.log("url from client!");
      this.postFromUrl(jsonFromUrl)
        .then(() => {
          runInAction(() => {
            this.properties.status = "done";
          });
        })
        .catch(err => (this.properties.status = "error"));
    }
  }
  @action showCityChart(city) {
    this.properties.status = "loading...";
    this.properties.chart = [];
    this.cityChartData(city)
      .then(data => {
        runInAction(() => {
          this.properties.chart = data.result;
          this.properties.status = "done";
        });
      })
      .catch(err => (this.properties.status = "error"));
  }
  @computed get propertiesCount() {
    return this.properties.data.length;
  }

  @computed get statsArr() {
    return this.processChartData(this.properties.chart);
  }

  loadProperties(cityFromInput) {
    let city = "";
    if (cityFromInput) {
      city = `?city=${cityFromInput}`;
    }
    return fetch(`http://localhost:3121/searchData${city}`).then(response =>
      response.json()
    );
  }
  loadCities() {
    return fetch("http://localhost:3121/allCities").then(response =>
      response.json()
    );
  }
  postProperty(jsonFromText) {
    return fetch("http://localhost:3121/uploadData/json", {
      method: "POST",
      body: jsonFromText,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      if (response.status === 400) {
        throw new Error(
          "Invalid Please make sure you entered the right data form ..."
        );
      }
      return response.json();
    });
  }
  postFromUrl(jsonFromUrl) {
    return fetch("http://localhost:3121/uploadData/url", {
      method: "POST",
      body: jsonFromUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-type": "application/x-www-form-urlencoded"
      }
    }).then(response => response.json());
  }

  cityChartData(city) {
    return fetch(`http://localhost:3121/cityChart?city=${city}`).then(
      response => response.json()
    );
  }

  processChartData(data) {
    if (data.length > 0) {
      let lastAvg = null;
      let currentIndex = 0;

      const min = 1;
      const max = 10;
      const values = [];

      for (let day = min; day <= max; day++) {
        if (day >= data[currentIndex].days) {
          lastAvg = data[currentIndex].sum / data[currentIndex].count;

          if (currentIndex < data.length - 1) currentIndex++;
        }
        values.push(lastAvg);
      }
      for (let i = 0; i < values.length; i++) {
        if (values[i] === null) {
          values[i] = values[i + 1];
        }
      }
      return values;
    } else {
      return [900, 1800, 2000, 1900, 1600, 2700, 2000, 3000, 5000, 9000];
    }
  }
}
const store = new PropertiesStore();
export default store;
