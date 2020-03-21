import React, { Component } from "react";
import PropTypes from "prop-types";

export class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>logging out and redirecting</h1>
            </div>
        );
    }

    componentWillMount() {
        this.props.logout();
    }

    static contextTypes = {
        router: PropTypes.object,
    };
}

export default LogoutComponent;
