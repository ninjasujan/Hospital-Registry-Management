import React, { Component } from "react";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      this.reqInter = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInter = axios.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          this.setState({ error: "Server Error.!" });
        }
      );
    }
    render() {
      return this.state.error ? (
        <div className="alert alert-danger py-5 text-center" role="alert">
          <h2 className="text-dark display-5">Internal Server Error.!</h2>
          <p className="lead">We will be back in soon.</p>
        </div>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

export default withErrorHandler;
