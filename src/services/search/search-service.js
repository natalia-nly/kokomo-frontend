import axios from "axios";

class SearchService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/search",
      withCredentials: true,
    });
    this.service = service;
  }

  searchLocation = (location) => {
    return this.service
      .get("/maps?search=" + location)
      .then((response) => response.data);
  };

  getAvailability = (body) => {
    return this.service
      .post("/getAvailability", body)
      .then((response) => response.data);
  };
}
export default SearchService;
