import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
