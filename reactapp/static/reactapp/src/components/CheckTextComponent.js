import React, { Component } from "react";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { Form, Button } from "react-bootstrap";

export class CheckTextComponent extends Component {
    constructor() {
        super();

        this.state = {
            testresults: { censored_text: "", count: 0 },
            loading: false,
            force_spaces: true
        };
        this.testText = this.testText.bind(this);
    }
    render() {
        return (
            <div className="container">
                <div>
                    <img
                        style={{ verticalAlign: "middle", marginRight: "8px" }}
                        height="48px"
                        alt="warning"
                        src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI4Ni4wNTQgMjg2LjA1NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjg2LjA1NCAyODYuMDU0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzcxMEQwNCIgZD0iTTE0My4wMjcsMEM2NC4wNCwwLDAsNjQuMDQsMCwxNDMuMDI3YzAsNzguOTk2LDY0LjA0LDE0My4wMjcsMTQzLjAyNywxNDMuMDI3ICAgYzc4Ljk5NiwwLDE0My4wMjctNjQuMDIyLDE0My4wMjctMTQzLjAyN0MyODYuMDU0LDY0LjA0LDIyMi4wMjIsMCwxNDMuMDI3LDB6IE0xNDMuMDI3LDI1OS4yMzYgICBjLTY0LjE4MywwLTExNi4yMDktNTIuMDI2LTExNi4yMDktMTE2LjIwOVM3OC44NDQsMjYuODE4LDE0My4wMjcsMjYuODE4czExNi4yMDksNTIuMDI2LDExNi4yMDksMTE2LjIwOSAgIFMyMDcuMjEsMjU5LjIzNiwxNDMuMDI3LDI1OS4yMzZ6IE0xNDMuMDM2LDYyLjcyNmMtMTAuMjQ0LDAtMTcuOTk1LDUuMzQ2LTE3Ljk5NSwxMy45ODF2NzkuMjAxYzAsOC42NDQsNy43NSwxMy45NzIsMTcuOTk1LDEzLjk3MiAgIGM5Ljk5NCwwLDE3Ljk5NS01LjU1MSwxNy45OTUtMTMuOTcyVjc2LjcwN0MxNjEuMDMsNjguMjc3LDE1My4wMyw2Mi43MjYsMTQzLjAzNiw2Mi43MjZ6IE0xNDMuMDM2LDE4Ny43MjMgICBjLTkuODQyLDAtMTcuODUyLDguMDEtMTcuODUyLDE3Ljg2YzAsOS44MzMsOC4wMSwxNy44NDMsMTcuODUyLDE3Ljg0M3MxNy44NDMtOC4wMSwxNy44NDMtMTcuODQzICAgQzE2MC44NzgsMTk1LjczMiwxNTIuODc4LDE4Ny43MjMsMTQzLjAzNiwxODcuNzIzeiIgZGF0YS1vcmlnaW5hbD0iI0UyNTc0QyIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iIzcyMEQwNCI+PC9wYXRoPgo8L2c+PC9nPiA8L3N2Zz4="
                    />
                    <h3 style={{ verticalAlign: "middle", display: "inline" }}>
                        WARNING! this site is all about NSFW words please stay
                        away if you feel unconfortable reading swears and curses
                    </h3>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <h4>test the api</h4>
                    <Form onSubmit={this.testText}>
                        <Form.Group controlId="text">
                            <Form.Label>your text</Form.Label>
                            <Form.Control as="textarea" rows="5" />
                        </Form.Group>
                        <Form.Group controlId="force-spaces">
                            <Form.Check
                                type="checkbox"
                                label="there must be spaces around the word(s)"
                                defaultChecked="true"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    {/* <form id="frmTest" onSubmit={this.testText}>
                        <div className="form-group">
                            <label for="text">your text</label>
                            <textarea
                                className="form-control"
                                id="text"
                                name="text"
                                rows="5"
                                form="frmTest"
                            />
                        </div>
                        <div className="form-group">
                            <label for="force-space">
                                there must be spaces around the word(s)
                            </label>
                            <input
                                id="force-space"
                                type="checkbox"
                                className="form-control"
                                checked={this.state.force_spaces}
                                form="frmTest"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form> */}
                    <div style={{ marginTop: "2em" }}>
                        <GridLoader loading={this.state.loading} margin="2" />
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    {/* <h3>text scan results</h3> */}
                    <h5>
                        {this.state.testresults.count} word(s) were found!
                        <br />
                        below is the censored text:
                    </h5>
                    <p>{this.state.testresults.censored_text}</p>
                </div>
            </div>
        );
    }

    testText(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var self = this;
        const form = e.target;
        let url = "http://127.0.0.1:7788/api/filter/"; //`${window.location.origin}/api/filter/`;
        axios({
            method: "post",
            url: url,
            data: {
                text: form.elements["text"].value,
                force_spaces: form.elements["force-spaces"].checked
            },
            config: { headers: { "Content-Type": "application/json" } }
        })
            .then(response => {
                //handle success
                this.setState({
                    testresults: {
                        censored_text: response.data.censored_text,
                        count: response.data.count
                    }
                });
            })
            .catch(function(response) {
                //handle error
                alert(response);
            })
            .then(function() {
                self.setState({ loading: false });
            });
    }
}

export default CheckTextComponent;
