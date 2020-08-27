import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: this.state.title,
      description: this.state.description,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/products/add", body, {
        withCredentials: true,
      })
      .then((response) => {
        // limpiar el formulario.
        this.setState({
          title: "",
          description: "",
        });
      });
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
                name="title"
                label="Email"
                variant="outlined"
                className="w-100 mb-3"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <TextField
                label="Contraseña"
                name="description"
                variant="outlined"
                className="w-100 mb-3"
                value={this.state.description}
                onChange={this.handleChange}
              />

              <button
                type="submit"
                class="btn-kokomo btn-kokomo-success btn-block p-3"
              >
                Login
              </button>
            </form>
            <a
              href="/auth/google"
              class="btn-kokomo btn-kokomo-grey btn-block p-3 mt-4"
            >
              Login con Google
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
