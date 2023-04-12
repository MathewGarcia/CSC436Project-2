import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "./components/Home";
import blogReducer from "./features/blogSlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <div className="App">
          <Home />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
