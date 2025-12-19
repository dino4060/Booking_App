import { UserAPI } from "@/api/UserAPI"
import { defaultStyles } from "@/constants/Style"
import {
	getValueSecureStore,
	saveValueSecureStore,
} from "@/store/SecureStore"
import { User, useUserStore } from "@/store/useUserStore"
import { Stack, router } from "expo-router"
import React, { useEffect, useState } from "react"
import {
	SafeAreaView,
	Text,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	View,
} from "react-native"

const LoginWithoutEmailField = () => {
	const [password, setPassword] = useState<any>("")
	const updateUser = useUserStore(
		(state) => state.updateUser
	)

	useEffect(() => {
		if (password.length === 6) {
			handleLogin()
		}
	}, [password])

	const handleLogin = async () => {
		try {
			const email = await getValueSecureStore("email")

			if (email) {
				const res = await UserAPI.login(email, password)

				if (res?.status === 200) {
					const {
						_id,
						name,
						email,
						phone_number,
						created_at,
						profile_image
					} = res?.data?.data

					const user: User = {
						_id,
						username: name,
						email,
						phoneNumber: phone_number,
						isLogin: true,
						profile_image: profile_image,
						created_at,
						token: res.data.token,
					}
					updateUser(user)
					await saveValueSecureStore("email", user.email)
					await saveValueSecureStore("id", user._id)
					await saveValueSecureStore("token", user.token)
					await saveValueSecureStore("password", password)
					await saveValueSecureStore("profile_image", profile_image)
					ToastAndroid.show(
						"Welcome back " + name + " 😍",
						2000
					)
					router.push("/")
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					header: () => <></>,
				}}
			></Stack.Screen>
			<View
				style={{
					margin: 50,
				}}
			>
				<Text
					style={{
						marginTop: 20,
						fontFamily: "mon-sb",
						fontSize: 30,
						letterSpacing: -2,
						textAlign: "center",
					}}
				>
					Welcome back
				</Text>
				<Text
					style={{
						fontFamily: "mon",
						fontSize: 15,
						letterSpacing: 0,
						textAlign: "center",
					}}
				>
					Please Input your Password
				</Text>
				<TextInput
					id='password'
					autoFocus
					value={password}
					onChangeText={(text) => {
						setPassword(text)
					}}
					maxLength={6}
					autoCapitalize='none'
					placeholder='******'
					keyboardType='numeric'
					secureTextEntry
					style={[
						defaultStyles.inputField,
						{
							height: "auto",
							marginTop: 20,
							fontFamily: "mon",
							fontSize: 30,
							textAlign: "center",
						},
					]}
				/>

				<TouchableOpacity
					onPress={() => {
						router.push("/(modals)/login")
					}}
					style={{
						...defaultStyles.btnCustom_1,
						marginTop: 15,
					}}
				>
					<Text style={defaultStyles.btnText}>
						Use another account 🤔?
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default LoginWithoutEmailField
