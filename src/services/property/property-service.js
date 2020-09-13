import axios from "axios";

class PropertyService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/property",
      withCredentials: true,
    });
    this.service = service;
  }

  propertyDetails = (propertyId) => {
    return this.service
      .get("/details/" + propertyId)
      .then((response) => response.data);
  };

  propertyLove = (propertyId) => {
    return this.service
      .get("/love/" + propertyId)
      .then((response) => response.data);
  };

  addComment = (propertyId,body) => {
    return this.service
      .post("/add-comment/" + propertyId, body)
      .then((response) => response.data);
  };

  deleteProperty = (propertyId) =>{
      return this.service
        .get("/delete/" + propertyId)
        .then((response) => response.data);
  }
}
export default PropertyService;
