import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import {
	Stack,
	router,
	useLocalSearchParams,
} from "expo-router"
import { default as React } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Congatulation = () => {
	const { congatulation } = useLocalSearchParams()

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					height: "auto",
					width: "auto",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Stack.Screen
					options={{
						header: () => <></>,
					}}
				></Stack.Screen>
				<Text
					style={{
						fontSize: 30,
						fontFamily: "mon-b",
						textAlign: "center",
						backgroundColor: "#fee2e2",
						color: "#0c0a09",
						padding: 30,
						borderRadius: 30,
						marginHorizontal: 20,
					}}
				>
					{congatulation}
				</Text>

				<View
					style={{
						flexDirection: "row",
						gap: 10,
						paddingHorizontal: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							router.push("/")
						}}
						style={{
							...defaultStyles.btn,
							flex: 1,
							backgroundColor: "#111827",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 5,
						}}
					>
						<Ionicons
							name='log-in-outline'
							size={22}
							color='white'
						/>
						<Text style={defaultStyles.btnText}>
							Home page
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							router.push("/trips")
						}}
						style={{
							...defaultStyles.btn,
							flex: 1,
							backgroundColor: "#ef4444",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 5,
						}}
					>
						<Ionicons
							name='briefcase-outline'
							size={22}
							color='white'
						/>
						<Text style={defaultStyles.btnText}>
							Your trips
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</GestureHandlerRootView>
	)
}

export default Congatulation
