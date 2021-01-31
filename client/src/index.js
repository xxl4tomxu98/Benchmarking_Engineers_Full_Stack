import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const CANDIDATES = [
  {
    id: 889,
  },
  {
    id: 897,
  },
  {
    id: 898,
  },
  {
    id: 908,
  },
  {
    id: 912,
  },
  {
    id: 913,
  },
];


ReactDOM.render(<App candidates={CANDIDATES}/>, document.getElementById('root'));
registerServiceWorker();
