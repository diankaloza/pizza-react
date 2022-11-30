import React from "react";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./scss/app.scss";

import { Header } from "./components/Header";

import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PizzaCart } from "./pages/PizzaCart";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <HashRouter>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pizza/:id" element={<PizzaCart />} />
          </HashRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
