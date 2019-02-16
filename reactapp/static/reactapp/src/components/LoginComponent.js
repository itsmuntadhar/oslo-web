import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

export class LoginComponent extends Component {
    render() {
        // var key = localStorage.getItem("key");
        // if (key !== undefined && key != "undefined" && key != null)
        //     return <Redirect to="/" />;
        if (this.props.isLoggedIn) return <Redirect to="/" />;
        return (
            <div className="container">
                <div className="row">
                    <div style={{ marginTop: "2em" }} className="col">
                        <h2>login</h2>
                        <form id="frmLogin" onSubmit={this.props.login}>
                            <div className="form-group">
                                <label for="username">username</label>
                                <input
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    type="text"
                                />
                            </div>
                            <div className="form-group">
                                <label for="password">password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    static contextTypes = {
        router: PropTypes.object,
    };
}

export default LoginComponent;
