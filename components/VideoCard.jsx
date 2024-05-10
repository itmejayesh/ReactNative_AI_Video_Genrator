import {View, Text, Image, TouchableOpacity} from "react-native";
import React from "react";
import {icons} from "../constants";
import {ResizeMode, Video} from "expo-av";

const VideoCard = ({
	video: {
		title,
		thumnail,
		video,
		users: {avatar, username},
	},
}) => {
	const [play, setPlay] = React.useState(false);
	return (
		<View className="flex-col items-center px-4 mb-14">
			<View className="flex-row pag-3 items-start">
				<View className="justify-center items-center flex-row flex-1 ">
					<View className="w-[46] h-[46] rounded-lg border border-red-500 justify-center items-center p-0.5">
						<Image
							source={{uri: avatar}}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>
					<View className="justify-center flex-1 ml-3 gap-y-1">
						<Text className="text-sm text-white font-medium" numberOfLines={1}>
							{title}
						</Text>
						<Text className="text-gray-300 font-normal " numberOfLines={1}>
							{username}
						</Text>
					</View>
					<View className="pt-2">
						<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
					</View>
				</View>
			</View>
			{play ? (
				<Video
					source={{uri: video}}
					className="w-full h-60 rounded-xl mt-3
			"
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status) => {
						if (status.didJustFinish) {
							setPlay(false);
						}
					}}
				/>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					style={{
						width: "100%",
						height: 200,
						borderRadius: 60,
						position: "relative",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 10,
					}}
					onPress={() => setPlay(true)}
				>
					<Image
						source={{uri: thumnail}}
						className="w-full h-full rounded-xl
                        mt-3"
						resizeMode="cover"
					/>
					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default VideoCard;
