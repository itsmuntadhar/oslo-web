import React, { Component } from "react";

export class AboutComponent extends Component {
    render() {
        return (
            <div>
                <h1>Project Oslo</h1>
                <h5>helps you "clean" your text</h5>
                <br />
                <h3>
                    initially developed by{" "}
                    <a href="https://muntadhar.net">Muntadhar Haydar</a>
                </h3>
                <h5>
                    open-source can be found on{" "}
                    <a href="https://github.com/sparkist97/oslo-web">GitHub</a>
                </h5>
            </div>
        );
    }
}

export default AboutComponent;
