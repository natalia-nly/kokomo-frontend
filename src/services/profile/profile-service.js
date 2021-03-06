import axios from "axios";

class ProfileService {
    constructor() {
        let service = axios.create({
          baseURL: process.env.REACT_APP_API_URL + "/profile",
          withCredentials: true,
        });
        this.service = service;
      }
    
    sendMessage = (customerId,body) => {
        return this.service
        .post("/send-message/" + customerId, body)
    }

    deleteMessage = (messageId) => {
      return this.service
        .post("/delete/" + messageId)
        .then((response) => response.data);
    };

    editPhone = (body) => {
      return this.service
        .post("/editTelephone", body)
        .then((response) => response.data);
    }

    addOwner = (body) => {
      return this.service
        .post("/add-owner")
        .then((response) => response.data);
    }

}
export default ProfileService