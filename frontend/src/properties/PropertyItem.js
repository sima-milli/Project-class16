import React from "react";
import "./style.css";
import { Slide } from "react-slideshow-image";

class PropertyItem extends React.Component {
  render() {
    const property = this.props.property;
    const images = property.images.split(",");

    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true
    };
    const imageSlide = images.map(img => (
      <div className="each-slide" key={img}>
        <div
          style={{
            backgroundImage: `url(${img})`,
            height: "200px"
          }}
        />
      </div>
    ));
    return (
      <div className="house">
        <div className="house-img">
          <Slide {...properties}>{imageSlide}</Slide>
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
