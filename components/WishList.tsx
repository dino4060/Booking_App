import { defaultStyles } from "@/constants/Style"
import { TRoom } from "@/interface/Room"
import { Wishlist } from "@/interface/Wishlist"
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
	listings: TRoom[]
}

const Listings = ({ listings: items }: Props) => {
	const renderRow: ListRenderItem<Wishlist> = ({
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
								(item?.room.thumbnail_urls as any) ||
								"https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece",
						}}
						style={styles.image}
					/>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
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
						<Text style={{ fontFamily: "mon" }}>
							{item.room.room_type}
						</Text>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Text style={{ fontFamily: "mon-sb" }}>
								€ {item.room.price}
							</Text>
							<Text style={{ fontFamily: "mon" }}>
								night
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
						}}
					>
						<Text style={{ fontFamily: "mon" }}>
							{item.room.summary}
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
				data={items as any}
				ListHeaderComponent={
					<Text style={styles.info}>
						{items.length} homes
					</Text>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 10,
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

export default Listings
