import { defaultStyles } from "@/constants/Style"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import React from "react"
import {
	ListRenderItem,
	StyleSheet,
	Text,
	View
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"

interface Props {
	trips: any[]
}

const CommingTrip = ({ trips }: Props) => {
	const renderRow: ListRenderItem<any> = ({ item }) => (
		<Animated.View style={styles.listing}>
			<Animated.Image
				style={styles.image}
				src={item.room.thumbnail_urls[0]}
			/>
			<Animated.View
				style={{
					borderBottomColor: "#00000040",
					borderBottomWidth: 1,
				}}
			>
				<Animated.Text
					style={{
						paddingHorizontal: 20,
						fontFamily: "mon-sb",
						fontSize: 20,
						paddingBottom: 10,
						textAlign: "left",
						marginTop: 14,
					}}
				>
					{item.room.name}
				</Animated.Text>
			</Animated.View>

			<Animated.View
				style={{
					flexDirection: "row",
					gap: 10,
					marginTop: 10,
					marginBottom: 20,
				}}
			>
				<Animated.Text
					style={{
						flex: 1,
						fontFamily: "mon",
						fontSize: 16,
						paddingHorizontal: 20,
						textAlign: "left",
						paddingTop: 10,
					}}
				>
					{formatDate(item.start_date)} -{" "}
					{formatDate(item.end_date)}
				</Animated.Text>

				<Animated.View
					style={{
						flex: 2,
						paddingTop: 10,
						paddingLeft: 20,
						paddingRight: 10,
						borderLeftWidth: 1,
						borderLeftColor: "#00000040",
						flexDirection: "column",
					}}
				>
					<Text
						style={{ fontFamily: "mon-b", fontSize: 18 }}
					>
						{item.room.smart_location}
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
							marginTop: 5,
						}}
					>
						<Text
							style={{ fontFamily: "mon-sb", fontSize: 20 }}
						>
							€ {item.total}
						</Text>
					</View>
				</Animated.View>
			</Animated.View>

			<View style={{ width: "100%" }}>
				<TouchableOpacity style={styles.button}>
					<Text style={{ color: "white", paddingLeft: 5 }}>
						Seeing more
					</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	)

	return (
		<View style={defaultStyles.container}>
			<Text
				style={{
					fontFamily: "damion",
					fontSize: 40,
					textAlign: "center",
					marginTop: 20,
				}}
			>
				Your trips
			</Text>
			<FlatList
				renderItem={renderRow}
				data={Array.isArray(trips) ? trips : []}
				// ref={listRef}
				ListHeaderComponent={
					<Text style={styles.info}>
						You are going on {trips.length} trips
					</Text>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listing: {
		margin: 16,
		borderRadius: 2,
		flexDirection: "column",

		alignItems: "center",
		marginVertical: 16,
		elevation: 2,
		shadowColor: "#00000080",
		shadowOpacity: 1,
		shadowRadius: 10,
		shadowOffset: {
			width: 10,
			height: 10,
		},
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 5,
	},
	info: {
		textAlign: "center",
		fontFamily: "mon-sb",
		fontSize: 16,
		marginTop: 4,
	},
	button: {
		backgroundColor: "#dc2626",
		width: "auto",
	},
})

export default CommingTrip

function formatDate(isoString: string): string {
	const date = new Date(isoString)
	const day = String(date.getUTCDate()).padStart(2, "0")
	const month = String(date.getUTCMonth() + 1).padStart(
		2,
		"0"
	) // Months are zero-based
	const year = date.getUTCFullYear()
	return `${day}/${month}/${year}`
}
