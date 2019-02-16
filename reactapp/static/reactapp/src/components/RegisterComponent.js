import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

export class RegisterComponent extends Component {
    render() {
        if (this.props.isLoggedIn) return <Redirect to="/" />;
        return (
            <div style={{ marginTop: "2em" }} className="col">
                <h2>register</h2>
                <form id="frmRegister" onSubmit={this.props.register}>
                    <div className="form-group">
                        <label for="regusername">username</label>
                        <input
                            className="form-control"
                            id="regusername"
                            name="regusername"
                            placeholder="username"
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label for="email">email</label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="email"
                            type="email"
                        />
                    </div>
                    <div className="form-group">
                        <label for="password1">password</label>
                        <input
                            className="form-control"
                            id="password1"
                            name="password1"
                            placeholder="password"
                            type="password"
                        />
                    </div>
                    <div className="form-group">
                        <label for="password2">repeat password</label>
                        <input
                            className="form-control"
                            id="password2"
                            name="password2"
                            placeholder="password"
                            type="password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        register
                    </button>
                </form>
            </div>
        );
    }

    static contextTypes = {
        router: PropTypes.object,
    };
}

export default RegisterComponent;
