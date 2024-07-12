import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

import { CitiesProvider } from "./contexts/CitiesContext";

import "./index.css";
import { AuthProvider } from "./contexts/FakeAuthContext";


function App() {

	return (
		<>
			<AuthProvider>
				<CitiesProvider>
					<BrowserRouter>
						<Routes>
							<Route index element={<Home />} />
							<Route path="product" element={<Product />} />
							<Route path="pricing" element={<Pricing />} />
							<Route path="login" element={<Login />} />
							<Route path="app" element={<AppLayout />}>
								<Route index element={<Navigate replace to="cities" />} />
								{/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
								<Route path="cities" element={<CityList />} />
								<Route path="cities/:id" element={<City />} />
								<Route path="countries" element={<CountryList />} />
								<Route path="form" element={<Form />} />
							</Route>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</BrowserRouter>
				</CitiesProvider>
			</AuthProvider>
		</>
	)
}

export default App
