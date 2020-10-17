import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { MapEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../assets/images/map-marker.png";
import { Container, Map, NextButton, NextButtonText } from "./styles";

export default function SelectMapPosition() {
	const navigation = useNavigation();

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

	function handleNextStep() {
		navigation.navigate("OrphanageData", { position });
	}

	function handleMapMapPosition(event: MapEvent) {
		setPosition(event.nativeEvent.coordinate);
	}

	return (
		<Container>
			<Map
				initialRegion={{
					latitude: -27.2092052,
					longitude: -49.6401092,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008,
				}}
				onPress={handleMapMapPosition}
			>
				{position.latitude !== 0 && (
					<Marker
						icon={mapMarkerImg}
						coordinate={{
							latitude: position.latitude,
							longitude: position.longitude,
						}}
					/>
				)}
			</Map>

			<NextButton
				enabled={position.latitude === 0 ? false : true}
				style={{
					backgroundColor: position.latitude === 0 ? "#CEDEE5ee" : "#15c3d6",
				}}
				onPress={handleNextStep}
			>
				<NextButtonText>Próximo</NextButtonText>
			</NextButton>
		</Container>
	);
}
