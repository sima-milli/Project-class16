import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { inject, observer } from "mobx-react";

@inject("PropertiesStore")
@observer
class CityChart extends Component {
  getChartData = e => {
    e.preventDefault();
    const city = this.selectCity.value;
    this.props.PropertiesStore.showCityChart(city);
  };

  render() {
    const { PropertiesStore } = this.props;
    const data = {
      labels: [
        "day 1",
        "day 2",
        "day 3",
        "day 4",
        "day 5",
        "day 6",
        "day 7",
        "day 8",
        "day 9",
        "day 10"
      ],
      datasets: [
        {
          label: "Prices per day",
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: PropertiesStore.statsArr
        },
        {
          label: "Prices per m2 per day",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [28, 48, 40, 19, 86, 27, 90, 30, 80, 73]
        }
      ]
    };
    return (
      <div className="pages">
        <h2>Prices Stats</h2>
        <form onSubmit={e => this.getChartData(e)}>
          <select
            id="inputState"
            className="form-control chart"
            ref={input => (this.selectCity = input)}
          >
            <option selected>Choose a City to search</option>
            {PropertiesStore.properties.cities.map((city, i) => (
              <option key={i} value={city.location_city}>
                {city.location_city} - {city.count}
              </option>
            ))}
          </select>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </div>
        </form>
        <div className="chart">
          <Line
            data={data}
            width={80}
            height={30}
            options={{
              // maintainAspectRatio: false,
              title: {
                display: true,
                text: "Prices stats " + this.props.match.params.city,
                fontSize: 25
              },
              legend: { display: true, position: "top", fullWidth: true }
            }}
          />
        </div>
      </div>
    );
  }
}

export default CityChart;
