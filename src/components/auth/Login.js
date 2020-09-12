import React, { Component } from "react";
import AuthService from "../../services/auth/auth-service";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
    this.service = new AuthService();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      user: this.state.user,
      password: this.state.password,
    };
    this.service
      .login(body.user, body.password)
      .then((response) => {
        this.setState({ user: "", password: "" });
        this.props.callback(response);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div
          className="row align-middle  justify-content-center p-4"
          style={{ "minHeight": "100vh" }}
        >
          <div className="col-sm-12 col-md-4 align-self-center">
            <h2 className="hero-title text-center mb-4">Iniciar sesión</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="user" className="label active">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="user"
                  value={this.state.user}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label active">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn-kokomo btn-kokomo-success btn-block p-3"
              >
                Iniciar sesión
              </button>
            </form>

            <a
              href={process.env.REACT_APP_API_URL + "/auth/google"}
              className="btn-kokomo btn-kokomo-google btn-block p-3 mt-4"
            >
              {" "}
              <img
                src="/images/google.svg"
                alt="Google logo"
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              Iniciar sesión con Google
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
