import React, { useState } from "react";
import { Switch } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
	Container,
	Title,
	Label,
	Input,
	ImagesInput,
	UploadedImagesContainer,
	ThumbnailImage,
	SwitchContainer,
	NextButton,
	NextButtonText,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";

interface Position {
	position: {
		latitude: number;
		longitude: number;
	};
}

export default function OrphanageData() {
	const route = useRoute();
	const params = route.params as Position;
	const navigation = useNavigation();

	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [instructions, setInstructions] = useState("");
	const [opening_hours, setOpeningHours] = useState("");
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState<string[]>([]);

	async function handleSelectImages() {
		const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

		if (status !== "granted") {
			alert("Precisamos da sua permissão para acessar as imagens");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
		});

		if (result.cancelled) {
			return;
		}

		const { uri: image } = result;

		setImages([...images, image]);
	}

	function handleForm() {
		const { latitude, longitude } = params.position;
		const data = new FormData();

		data.append("name", name);
		data.append("about", about);
		data.append("whatsapp", whatsapp);
		data.append("instructions", instructions);
		data.append("latitude", String(latitude));
		data.append("longitude", String(longitude));
		data.append("opening_hours", opening_hours);
		data.append("open_on_weekends", String(open_on_weekends));

		images.forEach((image, index) => {
			data.append("images", {
				name: `image_${index}.jpg`,
				type: "image/jpg",
				uri: image,
			} as any);
		});

		try {
			api.post("/orphanages", data).then((res) => console.log(res));
		} catch (error) {
			console.log(error);
		}
		navigation.navigate("OrphanagesMap");
	}

	return (
		<Container contentContainerStyle={{ padding: 24 }}>
			<Title>Dados</Title>

			<Label>Nome</Label>
			<Input value={name} onChangeText={(text) => setName(text)} />

			<Label>Sobre</Label>
			<Input
				value={about}
				onChangeText={(text) => setAbout(text)}
				style={{ height: 110 }}
				multiline
			/>

			<Label>Whatsapp</Label>
			<Input value={whatsapp} onChangeText={(text) => setWhatsapp(text)} />

			<Label>Fotos</Label>
			<UploadedImagesContainer>
				{images.map((image) => (
					<ThumbnailImage key={image} source={{ uri: image }} />
				))}
			</UploadedImagesContainer>
			<ImagesInput onPress={handleSelectImages}>
				<Feather name="plus" size={24} color="#15B6D6" />
			</ImagesInput>

			<Title>Visitação</Title>

			<Label>Instruções</Label>
			<Input
				value={instructions}
				onChangeText={(text) => setInstructions(text)}
				style={{ height: 110 }}
				multiline
			/>

			<Label>Horario de visitas</Label>
			<Input
				value={opening_hours}
				onChangeText={(text) => setOpeningHours(text)}
			/>

			<SwitchContainer>
				<Label>Atende final de semana?</Label>
				<Switch
					thumbColor="#fff"
					trackColor={{ false: "#ccc", true: "#39CC83" }}
					value={open_on_weekends}
					onValueChange={() => setOpenOnWeekends(!open_on_weekends)}
				/>
			</SwitchContainer>

			<NextButton onPress={handleForm}>
				<NextButtonText>Cadastrar</NextButtonText>
			</NextButton>
		</Container>
	);
}
