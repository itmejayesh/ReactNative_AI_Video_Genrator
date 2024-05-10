import {View, Text, FlatList, Image, RefreshControl, Alert} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import SearchBar from "../../components/SearchBar";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import {getAllPosts, getLatestPosts} from "../../lib/appwrite";
import useAppwrite from "../../lib/hooks/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
	const [refreshing, setRefreshing] = React.useState(false);
	const {data: posts, refetch} = useAppwrite(getAllPosts);
	const {data: lastestPosts} = useAppwrite(getLatestPosts);

	const onRefresh = async () => {
		setRefreshing(true);
		//check for new videos
		await refetch();
		setRefreshing(false);
	};
	return (
		<SafeAreaView style={{backgroundColor: "#000000", height: "100%"}}>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({item}) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-medium text-sm text-gray-100">Welcome Back</Text>
								<Text className="font-semibold text-2xl text-slate-50">userName</Text>
							</View>
							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-9"
									resizeMode="contain"
								/>
							</View>
						</View>
						<SearchBar />
						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-gray-50 text-lg font-semibold mb-3">
								Latest Video
							</Text>
							<Trending posts={lastestPosts ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Video Found"
						subtitle="Be the first one to upload a video"
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
