import React from "react";
import { inject, observer } from "mobx-react";

@inject("PropertiesStore")
@observer
class ResultsTable extends React.Component {
  render() {
    const { PropertiesStore } = this.props;
    const tableElements = PropertiesStore.properties.details.map(
      (el, index) => (
        <tbody key={index}>
          <tr>
            <td>processed:</td>
            <td>{el.processed}</td>
          </tr>
          <tr>
            <td>valid:</td>
            <td>{el.valid}</td>
          </tr>
          <tr>
            <td>failed:</td>
            <td>{el.failed}</td>
          </tr>
          <tr>
            <td>details:</td>
            <td>
              {el.details.length
                ? el.details.map(item => item.error)
                : "All valid :) "}
            </td>
          </tr>
        </tbody>
      )
    );
    return (
      <table className="result-table">
        <thead>
          <tr>
            <th>Results:</th>
          </tr>
        </thead>
        {tableElements}
      </table>
    );
  }
}

export default ResultsTable;
