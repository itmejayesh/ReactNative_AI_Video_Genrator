import {View, Text, SafeAreaView, FlatList} from "react-native";
import React, {useEffect} from "react";
import {useLocalSearchParams} from "expo-router";
import SearchBar from "../../components/SearchBar";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/hooks/useAppwrite";
import {searchPost} from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";

const Search = () => {
	const {query} = useLocalSearchParams();
	const [refreshing, setRefreshing] = React.useState(false);
	const {data: posts, refetch} = useAppwrite(() => searchPost(query));

	useEffect(() => {
		refetch();
	}, [query]);
	return (
		<SafeAreaView className="bg-black">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({item}) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="my-6 px-4">
						<Text className="font-medium text-sm text-gray-100">Search Results</Text>
						<Text className="font-semibold text-2xl text-slate-50">{query}</Text>
						<View className="mt-6 mb-8">
							<SearchBar initialQuery={query} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Video Found"
						subtitle="No video found for this search query"
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Search;
