import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals.tsx';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App.tsx';
import './styles/index.scss';

import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
