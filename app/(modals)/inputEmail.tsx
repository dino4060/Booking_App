import { UserAPI } from "@/api/UserAPI"
import { defaultStyles } from "@/constants/Style"
import { useForgetPasswordStore } from "@/store/useForgetPasswordStore"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { Stack, router } from "expo-router"
import React, { useState } from "react"
import { Text, ToastAndroid } from "react-native"
import {
	GestureHandlerRootView,
	TextInput,
} from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

const inputEmail = () => {
	const [email, setEmail] = useState<string>("")
	const updateEmail = useForgetPasswordStore(
		(state: any) => state.updateEmail
	)

	const handleSubmit = async () => {
		try {
			const res = await UserAPI.forgetPassword(email)
			if (res?.status === "SUCCESS") {
				updateEmail(email)
				router.push("/(modals)/forgetPassword")
			}
		} catch (error) {
			ToastAndroid.show(
				"Oh no! This is an invalid email, please try again 😥😔😭🥺🥹😓 !",
				ToastAndroid.SHORT
			)
		}
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView
				style={{
					marginVertical: 70,
					marginHorizontal: 20,
				}}
			>
				<Stack.Screen
					options={{
						header: () => <></>,
					}}
				></Stack.Screen>
				<Text
					style={{
						fontFamily: "mon-b",
						fontSize: 20,
						textAlign: "center",
					}}
				>
					Please input your email
				</Text>
				<TextInput
					value={email}
					onChangeText={setEmail}
					id='email_finding'
					autoCapitalize='none'
					placeholder='your email'
					style={[
						defaultStyles.inputField,
						{
							marginTop: 20,
							fontFamily: "mon",
							fontSize: 20,
							textAlign: "center",
						},
					]}
				/>

				<TouchableOpacity
					onPress={handleSubmit}
					style={{ ...defaultStyles.btn, marginTop: 10 }}
				>
					<Text style={defaultStyles.btnText}>
						Continue
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default inputEmail
