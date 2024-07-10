import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function useCities() {
	const context = useContext(CitiesContext);
	if ( undefined === context ) {
		throw new Error("You can not use context outside of the City Provider");
	}

	return context;
}

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect( function() {
		async function fetchCities() {
			try {
				setLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch (error) {
				alert("There was an error loading data!");
			} finally {
				setLoading(false);
			}
		}
		fetchCities();
	}, [] );

	async function getCity( id ) {

		if (Number(id) === currentCity.id) return;

		try {
			setLoading(true);
			const res = await fetch(`${BASE_URL}/cities/?id=${id}`);
			const data = await res.json();
			setCurrentCity(data[0]);
		} catch (error) {
			alert("There was an error loading data!");
		} finally {
			setLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				getCity,
				currentCity
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export { CitiesProvider, useCities };
