import { createRoot } from "react-dom/client";
import "./index.css";
import MyApp from "./App.tsx";
import { App } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <App>
    <Provider store={store}>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </Provider>
  </App>,
);
