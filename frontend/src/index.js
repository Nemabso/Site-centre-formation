import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { history } from "./history";
import { Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import loginReducer from './Reducers/loginReducer';
import signupReducer from './Reducers/signupReducer';
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  signupReducer: signupReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <Router history={history}>
    <App />
  </Router>,
  </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
