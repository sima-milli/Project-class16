import React from "react";
import "./style.css";

class PropertyItem extends React.Component {
  render() {
    const property = this.props.property;
    const images = property.images.split(",");
    return (
      <div className="house">
        <div className="house-img">
          <img src={images[0]} alt="property-img" />
        </div>
        <h5>{property.title}</h5>
        <span>
          <strong>Country: </strong>
        </span>
        <p> {property.location_country}</p>
        <span>
          <strong>City: </strong>
        </span>
        <p>{property.location_city}</p>
        <span>
          <strong>Address: </strong>
        </span>
        <p>{property.location_address}</p>
        <p>{property.market_date}</p>
      </div>
    );
  }
}

export default PropertyItem;
