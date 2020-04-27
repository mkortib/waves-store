import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import { BrowserRouter } from 'react-router-dom';
import './scss/style.scss';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    reduxThunk
)(createStore);

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
        <BrowserRouter>
            <React.StrictMode>
                <Routes />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
