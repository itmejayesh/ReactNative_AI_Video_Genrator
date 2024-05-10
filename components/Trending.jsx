import {
	View,
	Text,
	FlatList,
	ImageBackground,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import {icons} from "../constants";
import {Video, ResizeMode} from "expo-av";

const ZoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1.05,
	},
};

const ZoomOut = {
	0: {
		scale: 1,
	},
	1: {
		scale: 0.9,
	},
};

const TrendingItem = ({activeItem, item}) => {
	const [play, setPlay] = React.useState(false);

	return (
		<Animatable.View
			className=""
			animation={activeItem === item.$id ? ZoomIn : ZoomOut}
			duration={500}
		>
			{play ? (
				<Video
					source={{uri: item.video}}
					className="w-52 h-72 rounded-[35] mt-3
				bg-white/10"
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
						position: "relative",
						justifyContent: "center",
						alignItems: "center",
						marginHorizontal: 10,
					}}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{uri: item.thumnail}}
						className=" w-52 h-80 rounded-[35] my-5 overflow-hidden shadow-lg shadow-black/40
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
		</Animatable.View>
	);
};
const Trending = ({posts}) => {
	const [activeItem, setActiveItem] = React.useState(posts[1]);
	const viewableItemsChanges = ({viewableItems}) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	};
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.$id}
			renderItem={({item}) => <TrendingItem activeItem={activeItem} item={item} />}
			horizontal
			onViewableItemsChanged={viewableItemsChanges}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{x: 170}}
		/>
	);
};

export default Trending;
