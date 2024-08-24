import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "", loading: false };
  }

  validateForm = () => {
    const { email, password } = this.state;
    // Basic email validation (you can make this more robust)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.setState({
        message: <span className="text-danger">Invalid email format</span>,
      });
      return false;
    }

    if (password.length < 6) {
      this.setState({
        message: (
          <span className="text-danger">Password should be at least 6 characters</span>
        ),
      });
      return false;
    }

    return true;
  };

  onLoginClick = async () => {
    // Reset the message and set loading
    this.setState({ message: "", loading: true });

    // Validate form before sending request
    if (!this.validateForm()) {
      this.setState({ loading: false });
      return;
    }

    try {
      const { email, password } = this.state;

      // Use POST and send email/password in the body to avoid exposing them in the URL
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json();

      if (response.ok && body.success) {
        // Success - assuming body has a success field
        this.setState({
          message: <span className="text-success">Successfully Logged-in</span>,
          loading: false,
        });
      } else {
        // Error handling - assuming the server sends back an error message
        this.setState({
          message: <span className="text-danger">{body.message || "Invalid login"}</span>,
          loading: false,
        });
      }
    } catch (error) {
      // Handle any unexpected errors, such as network issues
      this.setState({
        message: (
          <span className="text-danger">An error occurred. Please try again.</span>
        ),
        loading: false,
      });
    }
  };

  render() {
    return (
      <div>
        <h4 className="m-1 p-2 border-bottom">Login</h4>

        {/* Email input */}
        <div className="form-group form-row">
          <label className="col-lg-4">Email:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </div>

        {/* Password input */}
        <div className="form-group form-row">
          <label className="col-lg-4">Password:</label>
          <input
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
        </div>

        <div className="text-right">
          {/* Display loading state or message */}
          {this.state.loading ? (
            <span>Loading...</span>
          ) : (
            this.state.message
          )}

          <button
            className="btn btn-primary m-1"
            onClick={this.onLoginClick}
            disabled={this.state.loading} // Disable the button when loading
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}





// import React, { Component } from "react";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { email: "", password: "", message: "" };
//   }

//   render() {
//     return (
//       <div>
//         <h4 className="m-1 p-2 border-bottom">Login</h4>

//         {/* Email starts */}
//         <div className="form-group form-row">
//           <label className="col-lg-4">Email:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={this.state.email}
//             onChange={(event) => {
//               this.setState({ email: event.target.value });
//             }}
//           />
//         </div>
//         {/* Email ends */}

//         {/* Password starts */}
//         <div className="form-group form-row">
//           <label className="col-lg-4">Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             value={this.state.password}
//             onChange={(event) => {
//               this.setState({ password: event.target.value });
//             }}
//           />
//         </div>
//         {/* Password ends */}

//         <div className="text-right">
//           {this.state.message}

//           <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   } //end of render

//   //Executes when the user clicks on Login
//   onLoginClick = async () => {
//     console.log(this.state);

//     var response = await fetch(
//       `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
//       { method: "GET" }
//     );

//     var body = await response.json();
//     console.log(body);

//     if (body.length > 0) {
//       //success
//       this.setState({
//         message: <span className="text-success">Successfully Logged-in</span>,
//       });
//     } else {
//       //error
//       this.setState({
//         message: (
//           <span className="text-danger">Invalid login, please try again</span>
//         ),
//       });
//     }
//   };
// }