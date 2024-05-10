import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import Dashboard from './Pages/Acceuil/Acceuil';
import { store } from "./App/store";
import { Provider } from "react-redux";
//import "bulma/css/bulma.css";
import axios from "axios";

axios.defaults.withCredentials =true; /** permettre  à Axios d'envoyer les cookies de session stockés par le navigateur avec chaque requête HTTP sortante so that every request we do , it will carry the credentials automatically , we don't have to do it manually at every request pour suivre l'etat d'authentification du user*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
