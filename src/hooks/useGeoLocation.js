import { useState } from "react";

export function useGeoLocation(defaultPosition = null) {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState(defaultPosition);

	function getPosition() {
		if (! navigator.geolocation)
			throw new Error("Your browser does not support geolocation");

		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				});
				setIsLoading(false);
			},
			(error) => {
				setIsLoading(false);
			}
		);
	}
	return { isLoading, position, getPosition };
}
