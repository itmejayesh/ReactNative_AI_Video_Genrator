import React from "react";
import {Alert} from "react-native";
import {getAllPosts} from "../appwrite";

const useAppwrite = () => {
	const [data, setData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await getAllPosts();
			setData(res);
		} catch (e) {
			Alert.alert("Error", e.message);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();

	return {data, isLoading, refetch};
};

export default useAppwrite;
