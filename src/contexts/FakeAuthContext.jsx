import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function useAuth() {
	const context = useContext(AuthContext);

	if ( undefined === context ) {
		throw new Error("You can not use context outside of the Auth Provider");
	}

	return context;
}

const FAKE_USER = {
	name: 'Kishan',
	email: 'kishanjasani007@yahoo.in',
	password: 'root',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

const initialState = {
	user: null,
	isAuthenticated: false
}

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload
			}
		case 'logout':
			return {
				...state,
				isAuthenticated: false,
				user: {}
			}
		default:
			throw new Error('Unknown action type');
	}
}

function AuthProvider({ children }) {

	const [state, dispatch]= useReducer(reducer, initialState);

	const {
		user,
		isAuthenticated
	} = state;

	function login( email, password ) {
		if ( email === FAKE_USER.email && password === FAKE_USER.password ) {
			dispatch({type: login, payload: FAKE_USER});
		}
	}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{
			user,
			isAuthenticated,
			login,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider, useAuth };
