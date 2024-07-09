import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";

import "./index.css";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";
function App() {

	const [cities, setCities] = useState([]);
	const [isLoading, setLoading] = useState(false);

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

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="product" element={<Product />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="login" element={<Login />} />
					<Route path="app" element={<AppLayout />}>
						<Route index element={<CityList cities={cities} isLoading={isLoading} />} />
						<Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
						<Route path="cities/:id" element={<City />} />
						<Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
						<Route path="form" element={<Form />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
