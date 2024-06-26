import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import {icons} from "../constants";
import CustomButton from "./CustomButton";
import {router, usePathname} from "expo-router";

const SearchBar = ({initialQuery}) => {
	const pathName = usePathname();
	const [query, setQuery] = useState(initialQuery || "");
	const [isFocused, setIsFocused] = useState(false);
	const [hasText, setHasText] = useState(Boolean(query));

	console.log(pathName);
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
				value={query}
				placeholder="Seach for a video topic..."
				placeholderTextColor={`#7b7b8b`}
				onChangeText={(e) => setQuery(e)}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>

			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert("Missing query");
					}
					if (pathName.startsWith("/search")) {
						router.setParams({query});
					} else router.push(`/search/${query}`);
				}}
			>
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

export default SearchBar;
