import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";

import "./index.css";

function App() {
	return (
		<>
			Travel Map
			<BrowserRouter>
				<Routes>
				<Route path="/" element={<Home />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
