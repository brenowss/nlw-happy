import React, { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";

import mapMarker from "../../assets/images/map-marker.svg";

import "./styles.css";
import api from "../../services/api";

const mapIcon = Leaflet.icon({
	iconUrl: mapMarker,
	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [170, 2],
});

interface Orphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

const OrphanagesMap = () => {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get("/orphanages").then((res) => setOrphanages(res.data));
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarker} alt="marker" />
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Antônio Prado</strong>
					<span>Rio Grande do Sul</span>
				</footer>
			</aside>

			<Map
				center={[-28.8484898, -51.2736556]}
				zoom={15}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
				/>
				{orphanages &&
					orphanages.map((orphanage) => (
						<Marker
							position={[orphanage.latitude, orphanage.longitude]}
							icon={mapIcon}
							key={orphanage.id}
						>
							<Popup
								closeButton={false}
								minWidth={240}
								maxWidth={240}
								className="map-popup"
							>
								{orphanage.name}
								<Link to={`/orphanages/${orphanage.id}`}>
									<FiArrowRight size={32} color="#FFF" />
								</Link>
							</Popup>
						</Marker>
					))}
			</Map>

			<Link to="/orphanage/create" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</div>
	);
};

export default OrphanagesMap;
