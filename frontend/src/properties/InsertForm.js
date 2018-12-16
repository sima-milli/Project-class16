import React from "react";

class InsertForm extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">
            Please upload JSON file
          </label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>
        <div className="form-row">
          <div className="col-7">
            <textarea className="form-control" placeholder="insert JSON" />
          </div>
          <div className="col">
            <input
              type="url"
              className="form-control"
              placeholder="Enter api for JSON data"
            />
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default InsertForm;
