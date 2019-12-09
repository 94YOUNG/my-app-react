/**
 *@desc
 *Created by yd on 2019-06-04
 * subscribe什么时候调用
 */
import {combineReducers, createStore} from 'redux';
import myReducer from '../reducer/reducer';
import {defaultState} from './def-state'
import otherReducer from '../reducer/otherReducer';
import {devToolsEnhancer} from 'redux-devtools-extension/developmentOnly';
let rootReducer = combineReducers({
	my:myReducer,
	other:otherReducer,
});
let myAppStore = createStore(rootReducer,defaultState,devToolsEnhancer());
export default myAppStore
