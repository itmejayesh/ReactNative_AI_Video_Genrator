import React, {useEffect, useState} from "react";
import {Stack, SplashScreen} from "expo-router";
import "../global.css";
import * as Font from "expo-font";

const RootLayout = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		SplashScreen.preventAutoHideAsync(); // Prevent auto hiding of SplashScreen

		// Load fonts
		const loadFonts = async () => {
			try {
				await Font.loadAsync({
					"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
					"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
					"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
					"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
					"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
					"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
					"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
					"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
					"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
				});
				setFontsLoaded(true); // Set fontsLoaded to true after fonts are loaded
				SplashScreen.hideAsync(); // Hide SplashScreen after fonts are loaded
			} catch (error) {
				console.log("Error loading fonts: ", error);
			}
		};

		loadFonts();

		return () => {
			// Cleanup function
			SplashScreen.hideAsync(); // Hide SplashScreen on unmount
		};
	}, []);

	if (!fontsLoaded) {
		return null; // Render nothing until fonts are loaded
	}

	return (
		<Stack>
			<Stack.Screen name="index" options={{headerShown: false}} />
			<Stack.Screen name="(auth)" options={{headerShown: false}} />
			<Stack.Screen name="(tabs)" options={{headerShown: false}} />
			{/* <Stack.Screen name="/search/[query]" options={{headerShown: false}} /> */}
		</Stack>
	);
};

export default RootLayout;
