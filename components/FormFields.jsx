import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import {icons} from "../constants";
import CustomButton from "./CustomButton";

const FormFields = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [hasText, setHasText] = useState(Boolean(value));

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-200 font-medium">{title}</Text>
			<View
				style={{
					borderWidth: 2,
					borderColor: isFocused || hasText ? "#d62828" : "#780000",
				}}
				className={`w-full h-16 px-4 bg-[#780000] rounded-2xl flex-row
             items-center`}
			>
				<TextInput
					className="flex-1 text-white font-medium text-base"
					value={value}
					placeholder={placeholder}
					placeholderTextColor={`#7b7b8b`}
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{title === "Password" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6 "
							resizeMode="contain"
							tintColor={`#dad7cd`}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormFields;
