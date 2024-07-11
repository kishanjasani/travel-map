import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { useGeoLocation } from '../hooks/useGeoLocation';

import styles from "./Map.module.css";
import Button from './Button';


function Map() {
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const { cities } = useCities();
	const [searchParams] = useSearchParams();
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getPosition
	} = useGeoLocation();

	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

	useEffect( function(){
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng] );

	useEffect( function() {
		if ( geoLocationPosition ) {
			setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
		}
	}, [geoLocationPosition] );

	return (
		<div className={styles.mapContainer}>
			{! geoLocationPosition && <Button type="position" onClick={getPosition}>
				{isLoadingPosition ? 'Loading...' : 'Use your position'}
			</Button>}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{ cities.map( city => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span> {city.cityName}
						</Popup>
					</Marker>
				) ) }
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
