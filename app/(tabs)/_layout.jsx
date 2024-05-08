import {View, Text, Image} from "react-native";
import React from "react";
import {Tabs} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {icons} from "../../constants";

const TabIcon = ({icon, color, name, focused}) => {
	return (
		<View className="items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className=" w-6 h-6"
			/>
			<Text
				style={{color: color}}
				className={`${focused ? `font-semibold` : `font-normal`}text-xs`}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#d4a373",
					tabBarInactiveTintColor: "#e9ecef",
					tabBarStyle: {
						backgroundColor: "#001219",
						borderTopWidth: 1,
						borderTopColor: "#e9ecef",
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({color, focused}) => {
							return (
								<TabIcon
									icon={icons.home}
									color={color}
									name={`Home`}
									focused={focused}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="bookmark"
					options={{
						title: "Bookmark",
						headerShown: false,
						tabBarIcon: ({color, focused}) => {
							return (
								<TabIcon
									icon={icons.bookmark}
									color={color}
									name="Bookmark"
									focused={focused}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: "Create",
						headerShown: false,
						tabBarIcon: ({color, focused}) => {
							return (
								<TabIcon
									icon={icons.bookmark}
									name="Create"
									color={color}
									focused={focused}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({color, focused}) => {
							return (
								<TabIcon
									icon={icons.profile}
									color={color}
									name="Profile"
									focused={focused}
								/>
							);
						},
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
