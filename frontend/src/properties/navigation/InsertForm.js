import React from "react";
import { inject, observer } from "mobx-react";
import ResultsTable from "../ResultsTable";

@inject("PropertiesStore")
@observer
class InsertForm extends React.Component {
  insertJson = e => {
    e.preventDefault();
    const jsonFromText = this.inputFromText.value;
    const jsonFromUrl = this.inputFromUrl.value;
    this.props.PropertiesStore.createProperty(jsonFromText, jsonFromUrl);
  };
  render() {
    const { PropertiesStore } = this.props;
    const insertResults = PropertiesStore.properties.details.length ? (
      <ResultsTable />
    ) : null;
    return (
      <div className="pages">
        <h2>Contribute with us! add your properties</h2>
        <div className="insert-form">
          {this.props.PropertiesStore.properties.status === "error" ? (
            <p className="error">
              Please make sure you entered valid inputs ...
            </p>
          ) : this.props.PropertiesStore.properties.status === "loading..." ? (
            <p />
          ) : (
            <p className="succeed">Valid!</p>
          )}
          <form onSubmit={e => this.insertJson(e)}>
            <div className="form-row">
              <div className="col-7">
                <textarea
                  className="form-control"
                  placeholder="insert JSON"
                  ref={input => (this.inputFromText = input)}
                />
              </div>
              <div className="col">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Enter api for JSON url"
                  ref={input => (this.inputFromUrl = input)}
                />
              </div>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-2">
                Insert
              </button>
            </div>
          </form>
        </div>
        <div>{insertResults}</div>
      </div>
    );
  }
}

export default InsertForm;
