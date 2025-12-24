import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Style"
import {
	TripStatusList,
	TTrip,
	TTripStatus,
} from "@/interface/Trip"
import { formatPriceVND } from "@/utils/number.util"
import React, { useEffect, useState } from "react"
import {
	ListRenderItem,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"

interface Props {
	trips: TTrip[]
}

const TripsContent = ({ trips }: Props) => {
	const [filterTrips, setFilterTrips] = useState<TTrip[]>(
		[]
	)
	const [tripStatus, setTripStatus] =
		useState<TTripStatus>("UPCOMING")

	useEffect(() => {
		setFilterTrips(filterTripStatus(trips, tripStatus))
	}, [trips, tripStatus])

	const renderTrip: ListRenderItem<TTrip> = ({ item }) => (
		<Animated.View style={styles.listing}>
			<Animated.Image
				style={styles.image}
				src={item.room.thumbnailUrls[0]}
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
					{formatDate(item.startDate)} -{" "}
					{formatDate(item.endDate)}
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
						{item.room.highlight}
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
							{formatPriceVND(item.total)}
						</Text>
					</View>
				</Animated.View>
			</Animated.View>
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
				renderItem={renderTrip}
				data={filterTrips}
				ListHeaderComponent={
					<View style={styles.headerContainer}>
						{/* Status filter */}
						<View style={styles.tabContainer}>
							{TripStatusList.map((status) => (
								<TouchableOpacity
									key={status}
									onPress={() => setTripStatus(status)}
									style={[
										styles.tabItem,
										tripStatus === status &&
											styles.tabItemActive,
									]}
								>
									<Text
										style={[
											styles.tabText,
											tripStatus === status
												? styles.tabTextActive
												: styles.tabTextInactive,
										]}
									>
										{status.charAt(0) +
											status.slice(1).toLowerCase()}
									</Text>
								</TouchableOpacity>
							))}
						</View>

						{/* Number info */}
						<Text style={styles.info}>
							You have {filterTrips.length}{" "}
							{tripStatus.toLowerCase()} trips
						</Text>
					</View>
				}
				// ListHeaderComponent={
				// 	<Text style={styles.info}>
				// 		You are going on {trips.length} trips
				// 	</Text>
				// }
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	headerTitle: {
		fontFamily: "damion",
		fontSize: 40,
		textAlign: "center",
		marginTop: 20,
	},
	headerContainer: {},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingHorizontal: 10,
		marginBottom: 10,
		gap: 5,
	},
	tabItem: {
		paddingVertical: 8,
		paddingHorizontal: 4,
	},
	tabItemActive: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.dark,
	},
	tabText: {
		fontFamily: "mon-sb",
		fontSize: 14,
	},
	tabTextActive: {
		color: Colors.dark,
	},
	tabTextInactive: {
		color: Colors.grey,
	},
	listing: {
		margin: 16,
		borderRadius: 10,
		flexDirection: "column",
		alignItems: "center",
		marginVertical: 16,
		backgroundColor: Colors.white,
		elevation: 2,
	},
	image: {
		width: "100%",
		height: 200,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
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

export default TripsContent

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

function filterTripStatus(
	trips: TTrip[],
	status: TTripStatus
) {
	return trips.filter((t) => t.status === status)
}
