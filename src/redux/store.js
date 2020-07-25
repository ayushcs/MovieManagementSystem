import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import movieReducers from './movieReducers'
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(movieReducers, composeWithDevTools(applyMiddleware(logger)));

export default store