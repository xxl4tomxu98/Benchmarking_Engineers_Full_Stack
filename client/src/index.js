import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const CANDIDATES = [889, 897, 898, 908, 912, 913];


ReactDOM.render(<App candidates={CANDIDATES}/>, document.getElementById('root'));
registerServiceWorker();
