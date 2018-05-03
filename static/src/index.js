import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {HashRouter} from 'react-router-dom'
import App from './AppStatic';
import store from './store';
import './assets/css/reset.css';
import 'element-theme-default';

ReactDOM.render((
    <Provider store={store}>
        <HashRouter><App/></HashRouter>
    </Provider>
), document.getElementById('root'))