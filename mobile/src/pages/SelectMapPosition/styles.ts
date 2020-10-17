import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	position: relative;
`;

export const Map = styled(MapView)`
	width: 100%;
	height: 100%;
`;

export const NextButton = styled(RectButton)`
	border-radius: 20px;
	justify-content: center;
	align-items: center;
	height: 56px;
	position: absolute;
	left: 24px;
	right: 24px;
	bottom: 40px;
`;

export const NextButtonText = styled.Text`
	font-family: Nunito_800ExtraBold;
	font-size: 16px;
	color: #fff;
`;