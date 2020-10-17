import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";

import { Feather } from "@expo/vector-icons";
import mapMarker from "../../assets/images/map-marker.png";
import {
	Container,
	CalloutContainer,
	CalloutText,
	Footer,
	FooterText,
	CreateOrphanageButton,
} from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../../services/api";

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

const OrphanagesMap = () => {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useFocusEffect(() => {
		api.get("/orphanages").then((res) => setOrphanages(res.data));
	});

	const navigation = useNavigation();

	function navigateToDetails(id: number) {
		navigation.navigate("OrphanageDetails", { id });
	}

	function navigateToCreateOrphanage() {
		navigation.navigate("SelectMapPosition");
	}

	return (
		<Container>
			<MapView style={{ height: "100%", width: "100%" }}>
				{orphanages &&
					orphanages.map((orphanage) => (
						<Marker
							key={orphanage.id}
							icon={mapMarker}
							coordinate={{
								latitude: orphanage.latitude,
								longitude: orphanage.longitude,
							}}
							calloutAnchor={{
								x: 2.3,
								y: 0.7,
							}}
						>
							<Callout tooltip onPress={() => navigateToDetails(orphanage.id)}>
								<CalloutContainer>
									<CalloutText>{orphanage.name}</CalloutText>
								</CalloutContainer>
							</Callout>
						</Marker>
					))}
			</MapView>
			<Footer>
				<FooterText>{orphanages.length} orfanatos encontrados</FooterText>
				<CreateOrphanageButton onPress={navigateToCreateOrphanage}>
					<Feather name="plus" size={20} color="#FFF" />
				</CreateOrphanageButton>
			</Footer>
		</Container>
	);
};

export default OrphanagesMap;
