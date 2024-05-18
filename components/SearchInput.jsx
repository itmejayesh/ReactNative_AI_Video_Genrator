import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import {icons} from "../constants";

const SearchInput = () => {
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
		<View
			style={{
				borderWidth: 2,
				borderColor: isFocused || hasText ? "#d62828" : "#780000",
			}}
			className={`w-full h-16 px-4 bg-[#780000] rounded-2xl flex-row
             items-center space-x-4`}
		>
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-normal"
				value={value}
				placeholder="Seach for a video topic..."
				placeholderTextColor={`#7b7b8b`}
				onChangeText={handleChangeText}
				secureTextEntry={title === "Password" && !showPassword}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>

			<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
				<Image
					source={icons.search}
					className="w-6 h-6 "
					resizeMode="contain"
					tintColor={`#dad7cd`}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
