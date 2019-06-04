/**
 *@desc
 *Created by yd on 2019-06-04
 */
import {combineReducers, createStore} from 'redux';
import myReducer from '../reducer/reducer';

let rootReducer = combineReducers({
	myReducer,
});
let myAppStore = createStore(rootReducer);
export default myAppStore
