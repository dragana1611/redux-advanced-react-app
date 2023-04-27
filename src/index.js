import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";

import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  //Provider props provides redux store to entire aplication
  <Provider store={store}>
    <App />
  </Provider>
);
