import { observable, action, computed, runInAction } from "mobx";

class PropertiesStore {
  @observable properties = {
    data: [],
    status: "loading..."
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

  @computed get propertiesCount() {
    return this.properties.data.length;
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
}

const store = new PropertiesStore();
export default store;
