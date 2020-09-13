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

}
export default ProfileService