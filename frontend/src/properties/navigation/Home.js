import React from "react";
import PropertyList from "../PropertyList";
import { inject, observer } from "mobx-react";

@inject("PropertiesStore")
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    props.PropertiesStore.showCities();
    props.PropertiesStore.showProperties();
  }

  searchCity = e => {
    e.preventDefault();
    const city = this.selectCity.value;

    this.props.PropertiesStore.showProperties(city);
  };
  render() {
    const { PropertiesStore } = this.props;
    return (
      <div>
        <div className="header-img">
          <div className="header-content">
            <h1 className="header-h1">Find your dream house</h1>
            <p className="header-p">From all around the WORLD</p>
            <div className="insert-form">
              <form onSubmit={e => this.searchCity(e)}>
                <select
                  id="inputState"
                  className="form-control"
                  ref={input => (this.selectCity = input)}
                >
                  <option selected>Choose a City to search</option>
                  {PropertiesStore.properties.cities.map((city, i) => (
                    <option key={i} value={city.location_city}>
                      {city.location_city} - {city.count}
                    </option>
                  ))}
                </select>
                <div className="price-range-div">
                  <label htmlFor="customRange3">Select price range</label>
                  <input
                    type="range"
                    className="custom-range"
                    min="0"
                    max="1000000"
                    step="0.5"
                    id="customRange3"
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-2">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <PropertyList />
        <div className="result-count">
          <span>
            <strong>Number of properties: </strong>
          </span>
          {PropertiesStore.propertiesCount}
        </div>
      </div>
    );
  }
}
export default Home;
