import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.css";

// var links = [<Nav.Link href="/">Home</Nav.Link>];

// var key = localStorage.getItem("key");
// if (key !== undefined && key != "undefined" && key != null)
//     links.push(<Nav.Link href="/logout">logout</Nav.Link>);
// else links.push(<Nav.Link href="/login">login</Nav.Link>);

ReactDOM.render(<App />, document.getElementById("root"));
