import React from "react";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import { Container, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

interface HeaderProps {
	title: string;
	showCancel?: boolean;
}

const Header = ({ title, showCancel = false }: HeaderProps) => {
	const navigation = useNavigation();

	function navigateToHome() {
		navigation.navigate("OrphanagesMap");
	}

	return (
		<Container>
			<BorderlessButton onPress={navigation.goBack}>
				<Feather name="arrow-left" size={24} color="#15b6d6" />
			</BorderlessButton>
			<Title>{title}</Title>

			{
        showCancel ? (
          <BorderlessButton onPress={navigateToHome}>
				<Feather name="x" size={24} color="#ff669c" />
			</BorderlessButton>
        ) : (
          <View />
        )
      }
		</Container>
	);
};

export default Header;
