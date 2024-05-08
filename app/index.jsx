import {Text, View, ScrollView, Image} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import CustomButton from "../components/CustomButton";
import {StatusBar} from "expo-status-bar";
import {Redirect, router} from "expo-router";

const index = () => {
	return (
		<SafeAreaView style={{backgroundColor: "#000000", height: "100%"}}>
			<ScrollView contentContainerStyle={{height: "100%"}}>
				<View
					className="w-full justify-center
				min-h-[85vh] items-center px-4"
				>
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>
					<View className="max-w-[380px] w-full h-[300px] rounded-xl over">
						<Image
							source={images.cards}
							className="w-full h-full flex-1"
							resizeMode="contain"
						/>
					</View>
					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">
							Explore Infinite {`\n`} Opportunities with {``}
							<Text className="text-[#d62828]">Vidio.Io</Text>
						</Text>
						<Image
							source={images.path}
							resizeMode="contain"
							className=" absolute -bottom-3 -right-6 w-[136px] h-[15px]"
						/>
					</View>
					<Text
						className="text-sm font-normal text-gray-100
					mt-7 text-center"
					>
						Unleash Your Imagination: Dive into a World of Boundless {`\n`} Innovation
						with Sparkle
					</Text>
					<CustomButton
						title="Continue with Email"
						handlePress={() => {
							router.push("/sign-in");
						}}
						containerStyles={{width: "100%", marginTop: 30}}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#344e41" style="light" />
		</SafeAreaView>
	);
};

export default index;
