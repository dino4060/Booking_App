import Colors from "@/constants/Colors"
import { TSetState } from "@/interface/Base"
import {
	DestinationList,
	TDestination,
} from "@/interface/RoomType"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { Link } from "expo-router"
import React, { useRef, useState } from "react"
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Props {
	destination: TDestination
	setDestination: TSetState<TDestination>
}

const ExploreHeader = ({
	destination,
	setDestination,
}: Props) => {
	const scrollRef = useRef<ScrollView>(null)
	const itemsRef = useRef<Array<any | null>>([])
	const [activeIndex, setActiveIndex] = useState(0)

	const selectCategory = (index: number) => {
		const selected = itemsRef.current[index]
		setActiveIndex(index)
		selected?.measure((x: any) => {
			scrollRef.current?.scrollTo({
				x: x - 16,
				y: 0,
				animated: true,
			})
		})
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		setDestination(DestinationList[index])
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.actionRow}>
					<Link href={"/(modals)/booking"} asChild>
						<TouchableOpacity>
							<View style={styles.searchBtn}>
								<Ionicons name='search' size={24} />
								<View>
									<Text style={{ fontFamily: "mon-sb" }}>
										Tìm kiếm nơi lưu trú
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Link>
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingHorizontal: 15,
					}}
				>
					{/* <ScrollView
						horizontal
						scrollEnabled={true}
						nestedScrollEnabled={true}
						ref={scrollRef}
						showsHorizontalScrollIndicator={true}
						contentContainerStyle={{
							alignItems: "center",
							gap: 20,
							// flex: 1,
							justifyContent: "space-around",
							paddingHorizontal: 16,
						}}
					> */}
					{DestinationList.map((item, index) => (
						<TouchableOpacity
							ref={(el: any) =>
								(itemsRef.current[index] = el)
							}
							key={index}
							style={
								item.name === destination.name
									? styles.categoriesBtnActive
									: styles.categoriesBtn
							}
							onPress={() => selectCategory(index)}
						>
							<MaterialIcons
								name={item.icon as any}
								size={24}
								color={
									activeIndex === index
										? Colors.dark
										: Colors.grey
								}
							/>
							<Text
								style={
									activeIndex === index
										? styles.categoryTextActive
										: styles.categoryText
								}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
					{/* </ScrollView> */}
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		height: 135,
	},
	scrollList: {
		width: "80%",
		height: 300,
	},
	actionRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 12,
	},
	filterButton: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 25,
	},
	searchContainer: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "flex-start",
		alignItems: "center",
	},

	searchBtn: {
		backgroundColor: Colors.white,
		flexDirection: "row",
		gap: 10,
		padding: 14,
		alignItems: "center",
		justifyContent: "center",
		width: 350,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#c2c2c2",
		borderRadius: 30,
		elevation: 10,
		shadowColor: Colors.dark,
		shadowOpacity: 0.15,
		shadowRadius: 10,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},

	filterBtn: {
		padding: 10,
		borderWidth: 1,
		borderColor: "#A2A0A2",
		borderRadius: 24,
	},
	categoryText: {
		fontSize: 12,
		fontFamily: "mon-sb",
		color: Colors.grey,
	},
	categoryTextActive: {
		fontSize: 12,
		fontFamily: "mon-sb",
		color: Colors.dark,
	},
	categoriesBtn: {
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
	},
	categoriesBtnActive: {
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: Colors.dark,
		borderBottomWidth: 2,
		paddingBottom: 8,
	},
})

export default ExploreHeader
