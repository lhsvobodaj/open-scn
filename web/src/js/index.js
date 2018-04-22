import React from 'react';
import {render} from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

window.React = React;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('react-app')
);
