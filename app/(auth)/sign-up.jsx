import {Text, View, ScrollView, Image, Alert} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormFields from "../../components/FormFields";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {createUser} from "../../lib/appwrite";

const SignUp = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert(`Error`, "Please fill all the fields fields");
			return;
		}

		setIsSubmitting(true);

		try {
			const result = await createUser(form.email, form.password, form.username);

			//todo add global state..

			router.replace(`/home`);
		} catch (error) {
			Alert.alert(`Error`, error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView
			style={{
				backgroundColor: "#000000",
				height: "100%",
			}}
		>
			<ScrollView>
				<View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo}
						className="w-[115px] h-[35px]"
						resizeMode="contain"
					/>
					<Text
						className="text-2xl text-white font-medium
					mt-10"
					>
						Sign Up to Video.Io
					</Text>
					<FormFields
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({...form, email: e})}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormFields
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({...form, username: e})}
						otherStyles="mt-10"
					/>
					<FormFields
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({...form, password: e})}
						otherStyles="mt-7"
					/>
					<CustomButton
						title="Sign In"
						handlePress={onSubmit}
						containerStyles={{width: "100%", marginTop: 30}}
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-light">
							Have an account already?
						</Text>
						<Link href={"/sign-in"} className="text-lg text-[#d62828]">
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
