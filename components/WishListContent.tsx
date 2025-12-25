import { defaultStyles } from "@/constants/Style"
import { TLikedRoom } from "@/interface/Wishlist"
import { formatPriceVND } from "@/utils/number.util"
import { Link } from "expo-router"
import {
	FlatList,
	ListRenderItem,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import Animated, {
	FadeInRight,
	FadeOutLeft,
} from "react-native-reanimated"

interface Props {
	list: TLikedRoom[]
	count: number
}

const WishlistContent = ({ list: items, count }: Props) => {
	const renderRow: ListRenderItem<TLikedRoom> = ({
		item,
	}) => (
		<Link href={`/listing/${item.room._id}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listing}
					entering={FadeInRight}
					exiting={FadeOutLeft}
				>
					<Animated.Image
						source={{
							uri:
								item.room.thumbnailUrls?.[0] ||
								"https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece",
						}}
						style={styles.image}
					/>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: 3,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontFamily: "mon-sb",
								textAlign: "center",
								width: "75%",
							}}
						>
							{item.room.name}
						</Text>
					</View>

					<View>
						<Text
							style={{
								fontFamily: "mon",
								textAlign: "center",
							}}
						>
							{item.room.roomType}
						</Text>
					</View>

					<View>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Text style={{ fontFamily: "mon-sb" }}>
								{formatPriceVND(item.room.price)}
							</Text>
							<Text style={{ fontFamily: "mon" }}>
								/ 2 đêm
							</Text>
						</View>
					</View>

					<View
						style={{
							width: "auto",
							borderColor: "#cccccc",
							borderWidth: 1,
							borderRadius: 20,
							paddingHorizontal: 30,
							paddingVertical: 10,
							maxWidth: 350,
						}}
					>
						<Text style={{ fontFamily: "mon" }}>
							{item.room.highlight}
						</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	)

	return (
		<View style={defaultStyles.container}>
			<Text
				style={{
					fontFamily: "damion",
					fontSize: 40,
					textAlign: "center",
				}}
			>
				WishList
			</Text>
			<FlatList
				renderItem={renderRow}
				data={items}
				ListHeaderComponent={
					<Text style={styles.info}>
						Bạn đã yêu thích {count} phòng
					</Text>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 5,
		flexDirection: "column",

		alignItems: "center",
		marginVertical: 16,
	},
	image: {
		width: 350,
		height: 350,
		borderRadius: 10,
	},
	info: {
		textAlign: "center",
		fontFamily: "mon-sb",
		fontSize: 16,
		marginTop: 4,
	},
})

export default WishlistContent
