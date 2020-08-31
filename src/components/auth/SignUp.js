import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import AuthService from "../../auth/auth-service";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
      telNumber: "",
      password: "",
    };
    this.service = new AuthService();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      user: this.state.user,
      password: this.state.password,
      telNumber: this.state.telNumber,
      email: this.state.email,
    };
    this.service
      .signup(body.user, body.password, body.telNumber, body.email)
      .then((response) => {
        this.setState({ user: "", password: "", telNumber: "", email: "" });
        this.props.callback(response);
        this.props.history.push("/profile");
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
          class="row align-middle  justify-content-center p-4"
          style={{ "min-height": "100vh" }}
        >
          <div class="col-sm-12 col-md-4 align-self-center">
            <form onSubmit={this.handleSubmit}>
              <TextField
                required
                name="user"
                label="Nombre de usuario"
                variant="outlined"
                className="w-100 mb-3"
                value={this.state.user}
                onChange={this.handleChange}
              />
              <TextField
                required
                name="telNumber"
                label="Teléfono"
                variant="outlined"
                className="w-100 mb-3"
                value={this.state.telNumber}
                onChange={this.handleChange}
              />
              <TextField
                required
                name="email"
                label="Email"
                variant="outlined"
                className="w-100 mb-3"
                value={this.state.email}
                onChange={this.handleChange}/>
              <TextField
                label="Contraseña"
                name="password"
                variant="outlined"
                className="w-100 mb-3"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <button
                type="submit"
                class="btn-kokomo btn-kokomo-success btn-block p-3"
              >
                Registrarme
              </button>
            </form>
            <a
              href="/auth/google"
              class="btn-kokomo btn-kokomo-grey btn-block p-3 mt-4"
            >
              Registrarme con Google
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
