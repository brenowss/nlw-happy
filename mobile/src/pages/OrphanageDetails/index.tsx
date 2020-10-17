import React, { useEffect, useState } from "react";
import { Dimensions, Linking, ScrollView } from "react-native";
import { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import mapMarkerImg from "../../assets/images/map-marker.png";

import {
	Container,
	ImagesContainer,
	Image,
	DetailsContainer,
	Title,
	Description,
	MapContainer,
	Map,
	RoutesContainer,
	RoutesText,
	Separator,
	ScheduleContainer,
	ScheduleItemBlue,
	ScheduleItemGreen,
	ScheduleItemRed,
	ScheduleTextBlue,
	ScheduleTextGreen,
	ScheduleTextRed,
	ContactButton,
	ContactButtonText,
} from "./styles";
import api from "../../services/api";

interface OrphanageDetails {
	id: number;
}

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	about: string;
	whatsapp: string;
	instructions: string;
	opening_hours: string;
	open_on_weekends: boolean;
	images: Array<{
		id: number;
		url: string;
	}>;
}

export default function OrphanageDetails() {
	const route = useRoute();

	const params = route.params as OrphanageDetails;

	const [orphanage, setOrphanage] = useState<Orphanage>();

	function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${orphanage?.whatsapp}&text=Tenho interesse na coleta de resíduos`)
  }

	useEffect(() => {
		api.get(`/orphanages/${params.id}`).then((res) => setOrphanage(res.data));
		return () => {
			setOrphanage({} as Orphanage);
		};
	}, [params.id]);


	function navigateToGoogleMaps() {
		Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude}, ${orphanage?.longitude}`)
	}

	if (!orphanage) {
		return null;
	}


	return (
		<Container>
			<ImagesContainer>
				<ScrollView horizontal pagingEnabled>
					{orphanage.images &&
						orphanage.images.map((image) => (
							<Image
								key={image.id}
								source={{
									uri: image.url,
								}}
								style={{
									height: 240,
									width: Dimensions.get("screen").width
								}}
							/>
						))}
				</ScrollView>
			</ImagesContainer>

			<DetailsContainer>
				<Title>{orphanage.name}</Title>
				<Description>{orphanage.about}</Description>

				<MapContainer>
					<Map
						initialRegion={{
							latitude: orphanage.latitude,
							longitude: orphanage.longitude,
							latitudeDelta: 0.008,
							longitudeDelta: 0.008,
						}}
						zoomEnabled={false}
						pitchEnabled={false}
						scrollEnabled={false}
						rotateEnabled={false}
					>
						<Marker
							icon={mapMarkerImg}
							coordinate={{
								latitude: orphanage.latitude,
								longitude: orphanage.longitude,
							}}
						/>
					</Map>

					<RoutesContainer onPress={navigateToGoogleMaps}>
						<RoutesText>Ver rotas no Google Maps</RoutesText>
					</RoutesContainer>
				</MapContainer>

				<Separator />

				<Title>Instruções para visita</Title>
				<Description>{orphanage.instructions}</Description>

				<ScheduleContainer>
					<ScheduleItemBlue>
						<Feather name="clock" size={40} color="#2AB5D1" />
						<ScheduleTextBlue>
							Segunda à Sexta {orphanage.opening_hours}
						</ScheduleTextBlue>
					</ScheduleItemBlue>
					{
						orphanage.open_on_weekends ? (
							<ScheduleItemGreen>
						<Feather name="info" size={40} color="#39CC83" />
						<ScheduleTextGreen>Atendemos fim de semana</ScheduleTextGreen>
					</ScheduleItemGreen>
						) : (
							<ScheduleItemRed>
						<Feather name="info" size={40} color="#FF669D" />
						<ScheduleTextRed>Não atendemos fim de semana</ScheduleTextRed>
					</ScheduleItemRed>
						)
					}
				</ScheduleContainer>

				<ContactButton onPress={handleWhatsapp}>
					<FontAwesome name="whatsapp" size={24} color="#FFF" />
					<ContactButtonText>Entrar em contato</ContactButtonText>
				</ContactButton>
			</DetailsContainer>
		</Container>
	);
}
