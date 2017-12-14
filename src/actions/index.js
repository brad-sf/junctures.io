import axios from 'axios';

import {firebase, database} from '../firebase';
import actions from './types';

export function fetchJunctures() {
	return {
		type: actions.FETCH_JUNCTURES,
		payload: axios.get('/mock/junctures.json')
	}
}

export function attemptSignIn(username, password) {
	return (dispatch) => {
		dispatch({type: actions.AUTH_ATTEMPT_SIGNIN});

		firebase.auth()
			.signInWithEmailAndPassword(username, password)
			.then((user) => {
				dispatch({
					type: actions.AUTH_ATTEMPT_SIGNIN_FULFILLED,
					payload: {
						username: user.email,
						uid: user.uid
					}
				});
			})
			.catch((error) => {
				dispatch({
					type: actions.AUTH_ATTEMPT_SIGNIN_ERROR,
					payload: error.message
				});
			});
	}
}

export function attemptRegister(username, password) {
	return (dispatch) => {
		dispatch({type: actions.AUTH_ATTEMPT_REGISTER});

		firebase.auth()
			.createUserWithEmailAndPassword(username, password)
			.then((user) => {
				database
					.ref(`users/${user.uid}`)
					.set({username: user.email});

				dispatch({
					type: actions.AUTH_ATTEMPT_REGISTER_FULFILLED,
					payload: {
						username: user.email,
						uid: user.uid
					}
				});
			})
			.catch((error) => {
				dispatch({
					type: actions.AUTH_ATTEMPT_REGISTER_ERROR,
					payload: error.message
				});
			});
	}
}