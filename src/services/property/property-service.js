import axios from "axios";

class PropertyService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/property",
      withCredentials: true,
    });
    this.service = service;
  }

  createProperty = (body) => {
    return this.service.post("/create-property",body).then((response) => response.data);
  }

  uploadPicture = (uploadData) => {
    return this.service.post("/upload",uploadData).then((response) => response.data);
  }

  editProperty = (propertyId, body) => {
    return this.service.post("/edit/"+propertyId,body).then((response) => response.data);
  }

  allProperties = () => {
    return this.service.get("/").then((response) => response.data);
  };

  categoryProperties = (category) => {
    return this.service
      .get("/category/" + category)
      .then((response) => response.data);
  };

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

  addComment = (propertyId, body) => {
    return this.service
      .post("/add-comment/" + propertyId, body)
      .then((response) => response.data);
  };

  deleteProperty = (propertyId) => {
    return this.service
      .get("/delete/" + propertyId)
      .then((response) => response.data);
  };
}
export default PropertyService;
