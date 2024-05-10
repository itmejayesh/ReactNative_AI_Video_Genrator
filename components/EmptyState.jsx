import {View, Text, Image} from "react-native";
import React from "react";
import {images} from "../constants";
import CustomButton from "./CustomButton";
import {router} from "expo-router";

const EmptyState = ({title, subtitle}) => {
	return (
		<View className="justify-center items-center px-4">
			<Image
				source={images.empty}
				className="w-[270] h-[215]"
				resizeMode="contain"
			/>
			<Text className="font-medium text-gray-200 text-xl">{title}</Text>
			<Text className="font-medium text-gray-400 text-sm">{subtitle}</Text>
			<CustomButton
				title={`Create Video`}
				handlePress={() => router.push(`/create`)}
				containerStyles={{width: "100%", marginTop: 15}}
			/>
		</View>
	);
};

export default EmptyState;
