import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "./App.css";
import CheckTextComponent from "./components/CheckTextComponent";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import NavBarComponent from "./components/NavBarComponent";
import AddWordComponent from "./components/AddWordComponent";
import RegisterComponent from "./components/RegisterComponent";
import AboutComponent from "./components/AboutComponent";

class App extends Component {
    constructor(props) {
        super(props);

        var key = localStorage.getItem("key");

        this.state = {
            key: key,
            isLoggedIn:
                key !== undefined && key !== "undefined" && key !== null,
            addWordResponse: ""
        };
    }

    render() {
        const routing = (
            <div>
                <NavBarComponent isLoggedIn={this.state.isLoggedIn} />
                <Router>
                    <div className="container">
                        <Route exact path="/" component={CheckTextComponent} />
                        <Route exact path="/about" component={AboutComponent} />
                        <Route
                            exact
                            path="/login"
                            component={() => (
                                <LoginComponent
                                    isLoggedIn={this.state.isLoggedIn}
                                    login={this.login}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/register"
                            component={() => (
                                <RegisterComponent
                                    isLoggedIn={this.state.isLoggedIn}
                                    register={this.register}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/logout"
                            component={() => (
                                <LogoutComponent
                                    isLoggedIn={this.state.isLoggedIn}
                                    logout={this.logout}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/addword"
                            component={() => (
                                <AddWordComponent
                                    isLoggedIn={this.state.isLoggedIn}
                                    addWord={this.addWord}
                                    addWordResponse={this.state.addWordResponse}
                                />
                            )}
                        />
                    </div>
                </Router>
            </div>
        );
        return routing;
    }

    login = e => {
        e.preventDefault();
        const form = e.target;
        let url = "http://127.0.0.1:7788/rest-auth/login/"; // `${window.location.origin}/rest-auth/login/`;
        axios({
            method: "post",
            url: url,
            data: {
                username: form.elements["username"].value,
                password: form.elements["password"].value
            },
            config: { headers: { "Content-Type": "application/json" } }
        })
            .then(response => {
                //handle success
                localStorage.setItem("key", response.data["key"]);
                this.setState(state => ({ isLoggedIn: true }));
                window.location = "/";
            })
            .catch(function(response) {
                //handle error
            });
    };

    register = e => {
        e.preventDefault();
        const form = e.target;
        let url = `${window.location.origin}/rest-auth/registration/`;
        axios({
            method: "post",
            url: url,
            data: {
                username: form.elements["regusername"].value,
                email: form.elements["email"].value,
                password1: form.elements["password1"].value,
                password2: form.elements["password2"].value
            },
            config: { headers: { "Content-Type": "application/json" } }
        })
            .then(response => {
                localStorage.setItem("key", response.data["key"]);
                this.setState(state => ({
                    isLoggedIn: true,
                    key: response.data["key"]
                }));
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${this.state.key}`;
                window.location = "/";
            })
            .catch(function(response) {});
    };

    logout = () => {
        let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/words/`;
        axios({
            method: "post",
            url: url,
            config: { headers: { "Content-Type": "application/json" } }
        })
            .then(response => {
                //handle success
                localStorage.removeItem("key");
                this.setState(state => ({ isLoggedIn: false, key: "" }));
                axios.defaults.headers.common["Authorization"] = "";
                window.location = "/";
            })
            .catch(function(response) {
                //handle error
            });
    };

    addWord = e => {
        e.preventDefault();
        const form = e.target;
        this.setState(state => ({ addWordResponse: "working on it" }));
        let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/words/`;
        let headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.state.key}`
        };
        let data = {
            word: form.elements["word"].value,
            severity: form.elements["severity"].value
        };
        axios({
            method: "post",
            url: url,
            headers: headers,
            data: data
        })
            .then(response => {
                //handle success
                this.setState(state => ({
                    addWordResponse: "word was added successfully"
                }));
            })
            .catch(error => {
                //handle error
                this.setState(state => ({
                    addWordResponse: error.response.data["details"]
                }));
            });
    };
}

export default App;
