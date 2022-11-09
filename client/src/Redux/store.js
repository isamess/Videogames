import thunk from 'redux-thunk';
import reducer from '../Redux/reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';



   
const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)));

export default store;