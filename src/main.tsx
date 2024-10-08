import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "./components/Context/RoomContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <RoomProvider>
          <App />
        </RoomProvider>
          </BrowserRouter>
          
      </PersistGate>
    </Provider>
  </StrictMode>
);
