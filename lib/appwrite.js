import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.vidio",
	projectId: "6639efd00028f18d7ebc",
	databaseId: "6639f1f70000b62bb812",
	userCollectionId: "6639f221003c4578f779",
	videoCollectionId: "6639f250000f526ddd2a",
	storageId: "6639f59300068df084ed",
};

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(config.endpoint) // Your Appwrite Endpoint
	.setProject(config.projectId) // Your project ID
	.setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);
		console.log(newAccount);
		if (!newAccount) {
			throw new Error("Failed to create account");
		}
		const avatarUrl = avatar.getInitials(username);
		await LogIn(email, password);
		return await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const LogIn = async (email, password) => {
	try {
		// const getActive = await account.getSession("current");
		// const result = await account.deleteSessions(getActive);
		const session = await account.createEmailPasswordSession(email, password);
		console.log(session);
		return session;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId
		);
		// return posts.document;
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.orderDesc(`$createdAt`, Query.limit(7))]
		);
		// return posts.document;
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};
