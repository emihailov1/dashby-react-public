import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import 'lato-font/css/lato-font.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import 'animate.css';
import './index.scss';
import App from './App';
import store from './store';
import {NotificationContainer} from 'react-notifications';

export const history: History<any>= createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
            <NotificationContainer/>
            <App history={history}></App>
    </Provider>
, document.getElementById('root'));
