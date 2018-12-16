import React, { Component } from "react";
import "./properties/style.css";
import { inject, observer } from "mobx-react";
import PropertyList from "./properties/PropertyList";
import TopNavigation from "./properties/navigation/TopNavigation";
import CityChart from "./properties/CityChart";

@inject("PropertiesStore")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    props.PropertiesStore.showProperties();
  }
  searchCity(e) {
    e.preventDefault();
    const cityFromInput = this.inputCity.value;

    this.props.PropertiesStore.showProperties(cityFromInput);
  }

  render() {
    const { PropertiesStore } = this.props;
    return (
      <div className="App">
        <div className="header-img">
          <div className="header-content">
            <h1 className="header-h1">Find your dream house</h1>
            <p className="header-p">From all around the WORLD</p>
            <div className="insert-form">
              <form onSubmit={e => this.searchCity(e)}>
                <div className="form-row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search City..."
                      ref={input => (this.inputCity = input)}
                    />
                  </div>
                  {/* <div class="form-group col-md-4">
                    <select
                      id="inputState"
                      class="form-control"
                      ref={input => (this.selectCity = input)}
                    >
                      <option selected>Choose a City to search</option>
                      {PropertiesStore.properties.data.map((property, i) => (
                        <option key={i} value={property.location_city}>
                          {property.location_city}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-2">
                    Submit
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

export default App;
