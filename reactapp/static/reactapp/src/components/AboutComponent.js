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
                <br />
                <h5>
                    you can participate by either making pull request to improve
                    the code or creating an account to submit words
                </h5>
                <br />
                <br />
                <h3>little documentation (API root currently is /api)</h3>
                <ul>
                    <li>
                        <h5>POST /filter/</h5>
                        <h6>request body</h6>
                        <ul>
                            <li>
                                <code>text</code> main text
                            </li>
                            <li>
                                <code>severity</code> minimum severity level,
                                value must be between 0 and 2. defaults to 1
                            </li>
                            <li>
                                <code>leading_space</code> must the word has
                                leading space? 1 for true, defaults to 0
                            </li>
                            <li>
                                <code>trailing_space</code> must the word has
                                trailing space? 1 for true, defaults to 0
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h5>GET /words/</h5>
                        <h6>request params</h6>
                        <ul>
                            <li>
                                <code>offset</code> result offset, must be
                                greater than or equals to 0, defaults to 0
                            </li>
                            <li>
                                <code>limit</code> result limit, must be between
                                1 and 50, defaults to 25
                            </li>
                            <li>
                                <code>exact_sev</code> is severity level exact?
                                1 for true, defaults to 1
                            </li>
                            <li>
                                <code>severity</code> severity level, must be
                                between 0 and 2, defaults to 1
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default AboutComponent;
