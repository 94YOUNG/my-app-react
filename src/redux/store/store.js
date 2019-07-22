/**
 *@desc
 *Created by yd on 2019-06-04
 * subscribe什么时候调用
 */
import {combineReducers, createStore} from 'redux';
import myReducer from '../reducer/reducer';
import {defaultState} from './def-state'
import otherReducer from '../reducer/otherReducer';
let rootReducer = combineReducers({
	my:myReducer,
	other:otherReducer,
});
let myAppStore = createStore(rootReducer,defaultState);
export default myAppStore
