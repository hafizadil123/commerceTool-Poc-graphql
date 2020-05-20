import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import Products from "./Products";
import ProductDetails from "./ProductDetail";
import { ThemeContext, Theme } from "./ThemeContext";

import Cart from "./Cart";
import apolloClient from "./apollo";
import "./App.css";
function App() {
  return (
    <Suspense
      fallback={
        <Loader
          type="Audio"
          color="#00BFFF"
          height={100}
          width={100}
          className="loader"
        />
      }
    >
      <BrowserRouter>
        <Switch>
          <ApolloProvider client={apolloClient}>
            <ThemeContext.Provider value={Theme}>
              <Route exact path="/" component={Products} />
              <Route
                exact
                path="/detail-page/:sku"
                component={ProductDetails}
              />
            </ThemeContext.Provider>
          </ApolloProvider>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
