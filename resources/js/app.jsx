import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DefaultView from './DefaultView';

ReactDOM.render(
    <BrowserRouter>
        <DefaultView />
    </BrowserRouter>,
    document.getElementById('app')
);
