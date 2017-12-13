import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import junctures from './junctures';
import user from './user';


export default combineReducers({
	user,
	junctures,
	router: routerReducer
});
