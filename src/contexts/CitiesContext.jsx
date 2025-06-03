import PropTypes from 'prop-types';
import { useEffect, useContext, useReducer, useCallback } from "react";
import { createContext } from "react";
import { BASE_URL } from "../constants";

const CitiesContext = createContext();

function useCities() {
	const context = useContext(CitiesContext);
	if ( undefined === context ) {
		throw new Error("You can not use context outside of the City Provider");
	}

	return context;
}

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
}

function reducer( state, action ) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				isLoading: true
			}
		case 'cities/loaded':
			return {
				...state,
				isLoading: false,
				cities: action.payload
			}
		case 'city/loaded':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload
			}
		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload
			}
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter( city => city.id != action.payload ),
				currentCity: {}
			}
		case 'rejected':
			return {
				...state,
				isLoading: false,
				error: action.payload
			}
		default:
			throw new Error('Unknown action type');
	}
}

function CitiesProvider({ children }) {
	const [state, dispatch] = useReducer( reducer, initialState );

	const {
		cities,
		isLoading,
		currentCity,
	} = state;

	useEffect( function() {
		async function fetchCities() {
			dispatch({
				type: 'loading'
			});

			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({
					type: 'cities/loaded',
					payload: data
				})
			} catch (error) {
				dispatch({ type: 'rejected', payload: 'There was an error loading cities!' })
			}
		}
		fetchCities();
	}, [] );

	const getCity = useCallback(
		async function getCity( id ) {

			if (Number(id) === currentCity.id) return;

			dispatch({
				type: 'loading'
			});

			try {
				const res = await fetch(`${BASE_URL}/cities/?id=${id}`);
				const data = await res.json();
				dispatch({
					type: 'city/loaded',
					payload: data[0]
				});
			} catch (error) {
				dispatch({ type: 'rejected', payload: 'There was an error loading city!' })
			}
		},
		[currentCity.id]
	);

	async function createCity( newCity ) {
		dispatch({
			type: 'loading'
		});

		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			dispatch({
				type: 'city/created',
				payload: data
			});
		} catch (error) {
			dispatch({ type: 'rejected', payload: 'There was an error creating city!' });
		}
	}

	async function deleteCity( id ) {
		dispatch({
			type: 'loading'
		});
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			dispatch({ type: 'city/deleted', payload: id });
		} catch (error) {
			dispatch({ type: 'rejected', payload: 'There was an error deleting city!' })
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				getCity,
				currentCity,
				createCity,
				deleteCity
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

CitiesProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { CitiesProvider, useCities };
