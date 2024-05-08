import {TouchableOpacity, Text, View} from "react-native";
import React from "react";

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			style={{
				backgroundColor: "#c1121f",
				borderRadius: 999,
				minHeight: 62,
				justifyContent: "center",
				alignItems: "center",
				...containerStyles,
				opacity: isLoading ? 0.5 : 1,
			}}
			disabled={isLoading}
		>
			<Text
				className={`text-lg font-medium text-white
			${textStyles}`}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
