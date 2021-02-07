import axios from "axios";
class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/auth",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (username, password, telNumber, email) => {
    return this.service
      .post("/signup", { username, password, telNumber, email })
      .then((response) => response.data);
  };

  signupLocal = (username, password, telNumber, email) => {
    return this.service
      .post("/signup-local", { username, password, telNumber, email })
      .then((response) => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then((response) => response.data);
  };

  upload = (file) => {
    const image = new FormData();
    image.append("image", file);
    return this.service.put("/upload", image).then((response) => response.data);
  };

  edit = (username, campus, course) => {
    return this.service
      .put("/edit", { username, campus, course })
      .then((response) => response.data);
  };

  infoUser = () => {
    return this.service.get("/info-user/").then((response) => response.data);
  };
  
  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };
}
export default AuthService;
