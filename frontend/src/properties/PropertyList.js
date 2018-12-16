import React from "react";
import { inject, observer } from "mobx-react";
import PropertyItem from "./PropertyItem";
import "./style.css";

@inject("PropertiesStore")
@observer
class PropertyList extends React.Component {
  render() {
    const { PropertiesStore } = this.props;
    const displayProperties = PropertiesStore.properties.data.map(
      (property, index) => <PropertyItem key={index} property={property} />
    );
    return <div className="main">{displayProperties}</div>;
  }
}

export default PropertyList;
