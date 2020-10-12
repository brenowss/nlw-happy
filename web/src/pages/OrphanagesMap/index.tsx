import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer } from "react-leaflet";

import mapMarker from "../../assets/images/map-marker.svg";

import "leaflet/dist/leaflet.css"
import "./styles.css";

const OrphanagesMap = () => {
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
          width: '100%',
          height: '100%'
        }}>
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        </Map>

			<Link to="" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</div>
	);
};

export default OrphanagesMap;
