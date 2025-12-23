import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import {
	Stack,
	useLocalSearchParams,
	useRouter,
} from "expo-router"
import { useEffect, useState } from "react"
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
} from "react-native-reanimated"
// @ts-ignore

import { RoomAPI } from "@/api/RoomAPI"
import { Room } from "@/interface/Room"
import { useUserStore } from "@/store/useUserStore"
import { UtilFunction } from "@/utils/utilFunction"
import { Calendar } from "react-native-calendars"
import { SafeAreaView } from "react-native-safe-area-context"

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity)

const DetailPage = () => {
	const { id } = useLocalSearchParams()

	const [dateRange, setDateRange] = useState({
		startDate: "",
		endDate: "",
	})
	const [markedDates, setMarkedDates] = useState({})
	const [bookedDate, setBookedDate] = useState([])
	const [dataPrice, setDataPrice] = useState({
		numberOfDay: UtilFunction.caculateDate(
			dateRange.startDate,
			dateRange.endDate
		),
		total: 0,
	})

	// get data of room by id, render to UI
	const [homeStay, setHomeStay] = useState<Room>()

	useEffect(() => {
		const getRoom = async (id: number) => {
			const res = await RoomAPI.getRoomById(id)
			if (res.success == false) return
			setHomeStay(res.data || ({} as Room))
			setBookedDate(["2024-12-23"] as any)
		}

		getRoom(Number(id))
	}, [])

	const [openCard, setOpenCard] = useState(0)
	const router = useRouter()

	useEffect(() => {
		if (
			!isDateXAfterDateY(
				dateRange.startDate,
				dateRange.endDate
			)
		) {
			setDataPrice(() => {
				let numberOfDay = UtilFunction.caculateDate(
					dateRange.startDate,
					dateRange.endDate
				)

				return {
					numberOfDay: numberOfDay,
					total: Number.parseFloat(
						(numberOfDay * (homeStay?.price || 0)).toFixed(
							2
						)
					),
				}
			})
		}
	}, [dateRange.startDate, dateRange.endDate])

	const onClearAll = () => {
		setOpenCard(0)
	}

	const handleDayPress = (date: any) => {
		const { startDate, endDate } = dateRange

		if (startDate === "") {
			setDateRange({
				startDate: date.dateString,
				endDate: "",
			})
		} else if (startDate && endDate === "") {
			if (date.dateString !== startDate) {
				if (
					checkBookedDateContainDateRange(
						bookedDate,
						startDate,
						date.dateString
					)
				) {
					ToastAndroid.show(
						"The date range include booked date",
						ToastAndroid.SHORT
					)
					setDateRange({
						startDate: "",
						endDate: "",
					})
				} else
					setDateRange({
						startDate,
						endDate: date.dateString,
					})
			}
		} else {
			setDateRange({
				startDate: date.dateString,
				endDate: "",
			})
		}
	}

	const { user } = useUserStore()

	const handleBooking = async () => {
		const user_id = user._id
		// const token = user.token
		const room_id = id as string
		const start_date = dateRange.startDate
		const end_date = dateRange.endDate

		const res = await RoomAPI.reservation(
			user_id,
			room_id,
			start_date,
			end_date,
			"" // token
		)

		const message = "Chúc mừng bạn đã đặt phòng thành công"

		if (res) router.push(`(information)/${message}` as any)
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					header: () => (
						<SafeAreaView
							style={{ ...styles.card, padding: 20 }}
						>
							<Text style={styles.previewText}>
								Having amazing trip in {homeStay?.name} 🔥
							</Text>
						</SafeAreaView>
					),
				}}
			></Stack.Screen>
			<ScrollView style={{ flex: 1 }}>
				<View
					style={{ ...styles.card, paddingBottom: 200 }}
				>
					{openCard != 1 && (
						<AnimatedTouchableOpacity
							onPress={() => setOpenCard(1)}
							style={styles.cardPreview}
							entering={FadeIn.duration(200)}
							exiting={FadeOut.duration(200)}
						>
							<Text style={styles.previewText}>When</Text>
							<Text style={styles.previewdData}>
								Any week
							</Text>
						</AnimatedTouchableOpacity>
					)}

					<View style={{ ...styles.card, padding: 20 }}>
						<Image
							source={{
								uri:
									homeStay?.thumbnailUrls?.[0] ||
									"https://placehold.jp/500x300.png",
							}}
							style={[styles.image]}
							resizeMode='cover'
						/>
					</View>

					{openCard == 1 && (
						<Text style={styles.cardHeader}>
							When's your trip?
						</Text>
					)}

					{openCard == 1 && (
						<Animated.View>
							<Calendar
								firstDay={0}
								style={{
									borderRadius: 10,
									elevation: 4,
									margin: 40,
								}}
								onDayPress={handleDayPress}
								minDate={formatDate()}
								maxDate='2025-01-01'
								hideExtraDays={true}
								markingType='period'
								markedDates={{
									...generateMarkedDates(
										dateRange.startDate,
										dateRange.endDate
									),
									...generateDisableDate(bookedDate),
								}}
							/>
							<Calendar
								onDayPress={(day) => {
									console.log("selected day", day)
								}}
							/>
						</Animated.View>
					)}
				</View>

				{/* Footer */}
			</ScrollView>

			<Animated.View
				style={defaultStyles.footer}
				entering={SlideInDown.delay(200)}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={{
							height: "100%",
							justifyContent: "center",
						}}
						onPress={onClearAll}
					>
						<Text
							style={{
								fontSize: 18,
								fontFamily: "mon-sb",
							}}
						>
							Total: € {dataPrice.total}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							defaultStyles.btn,
							{ paddingRight: 20, paddingLeft: 50 },
						]}
						onPress={() => handleBooking()}
					>
						<Ionicons
							name='search-outline'
							size={24}
							style={defaultStyles.btnIcon}
							color={"#fff"}
						/>
						<Text style={defaultStyles.btnText}>Book</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</GestureHandlerRootView>
	)
}

function checkBookedDateContainDateRange(
	bookedDate: string[],
	startDateString: string,
	endDateString: string
) {
	let startDate = new Date(startDateString)
	let endDate = new Date(endDateString)

	for (let i = 0; i < bookedDate.length; i++) {
		let date = new Date(bookedDate[i])
		if (date >= startDate && date <= endDate) {
			return true // At least one booked date falls within the range
		}
	}
	return false // No booked date falls within the range
}

function isDateXAfterDateY(dateX: string, dateY: string) {
	const x = new Date(dateX)
	const y = new Date(dateY)

	return x > y
}

function formatDate(): string {
	const today: Date = new Date()
	const year: number = today.getFullYear()
	const month: number = today.getMonth() + 1 // January is 0
	const day: number = today.getDate()

	// Padding single digits with leading zeros
	const formattedMonth: string =
		month < 10 ? `0${month}` : `${month}`
	const formattedDay: string =
		day < 10 ? `0${day}` : `${day}`

	// Combining the components into the desired format
	const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`

	return formattedDate
}

function generateDisableDate(dateList: string[]) {
	let result: { [k: string]: any } = {}
	dateList.forEach((date) => {
		result[date] = {
			disabled: true,
			disableTouchEvent: true,
		}
	})
	return result
}

function generateMarkedDates(
	startDateString: string,
	endDateString: string
) {
	if (startDateString == "" || endDateString == "")
		return {}

	let markedDates: any = {}

	let startDate = new Date(startDateString)
	let endDate = new Date(endDateString)

	// If start date is greater than end date, return empty markedDates object
	if (startDate > endDate) {
		return markedDates
	}

	// Add starting day
	markedDates[startDateString] = {
		startingDay: true,
		color: "#FF385C",
	}

	// Add days between start and end date
	let currentDate = new Date(startDate)
	while (currentDate < endDate) {
		currentDate.setDate(currentDate.getDate() + 1)
		let dateString = currentDate.toISOString().slice(0, 10)
		markedDates[dateString] = {
			marked: true,
			color: "#FF385C",
			dotColor: "transparent",
		}
	}

	// Add ending day
	markedDates[endDateString] = {
		endingDay: true,
		color: "#FF385C",
		dotColor: "transparent",
	}

	return {
		...markedDates,
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: "white",
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 14,
		margin: 10,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		gap: 20,
	},
	cardHeader: {
		fontFamily: "mon-b",
		fontSize: 24,
		padding: 20,
	},
	cardBody: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	cardPreview: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},

	searchSection: {
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		marginBottom: 16,
	},
	searchIcon: {
		padding: 10,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	placesContainer: {
		flexDirection: "row",
		gap: 25,
	},
	place: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	placeSelected: {
		borderColor: Colors.grey,
		borderWidth: 2,
		borderRadius: 10,
		width: 100,
		height: 100,
	},
	previewText: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.grey,
	},
	previewdData: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.dark,
	},

	guestItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 10,
	},
	itemBorder: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey,
	},
})
export default DetailPage
