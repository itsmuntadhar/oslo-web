import React, { Component } from "react";

export class AddWordComponent extends Component {
    render() {
        return !this.props.isLoggedIn ? (
            <h1>sorry! you gotta have an account and be logged in :/</h1>
        ) : (
            <React.Fragment>
                <div className="row">
                    <div className="col" style={{ paddingTop: "2em" }}>
                        <form id="frmLogin" onSubmit={this.props.addWord}>
                            <div className="form-group">
                                <label for="word">word</label>
                                <input
                                    className="form-control"
                                    id="word"
                                    name="word"
                                    placeholder="word"
                                    type="text"
                                />
                            </div>
                            <div className="form-group">
                                <label for="severity">word severity</label>
                                <select className="form-control" id="severity">
                                    <option value="0">low</option>
                                    <option value="1">medium</option>
                                    <option value="2">high</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>{this.props.addWordResponse}</h3>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddWordComponent;
