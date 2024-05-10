import {Text, View, ScrollView, Image, Alert} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormFields from "../../components/FormFields";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {LogIn} from "../../lib/appwrite";

const SignIn = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmitHandle = async () => {
		if (!form.email || !form.password) {
			Alert.alert(`Error`, "Please fill all the fields fields");
			return;
		}
		setIsSubmitting(true);

		try {
			await LogIn(form.email, form.password);
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
						Log In to Video.Io
					</Text>
					<FormFields
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({...form, email: e})}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormFields
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({...form, password: e})}
						otherStyles="mt-7"
					/>
					<CustomButton
						title="Sign In"
						handlePress={onSubmitHandle}
						containerStyles={{width: "100%", marginTop: 30}}
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-light">
							Dont have account ?
						</Text>
						<Link href={"/sign-up"} className="text-lg text-[#d62828]">
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
