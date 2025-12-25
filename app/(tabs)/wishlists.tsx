import { WishlistAPI } from "@/api/WishlistAPI"
import WishList from "@/components/WishListContent"
import { TLikedRoom } from "@/interface/Wishlist"
import { useUserStore } from "@/store/useUserStore"
import { router, Stack, useFocusEffect } from "expo-router"
import React, { useCallback, useState } from "react"
import { Alert, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

const Wishlists = () => {
	const user = useUserStore((state) => state.user)
	const [list, setList] = useState<TLikedRoom[]>([])
	const [count, setCount] = useState<number>(0)

	// useEffect(() => {
	// 	if (user.isLogin === false) {
	// 		router.push("/login")
	// 	}
	// 	paginateWishlist()
	// }, [user])

	useFocusEffect(
		useCallback(() => {
			if (user.isLogin === false) {
				router.push("/login")
			}

			const paginateWishlist = async () => {
				if (user.isLogin === false) {
					return
				}
				const res = await WishlistAPI.paginateRooms()

				if (res.success === false) {
					console.error("API error: ", res.message)
					Alert.alert("Có lỗi", res.message)
					return
				}
				console.log(res.data)

				setList(res.data.items)
				setCount(res.data.totalItems)
			}

			paginateWishlist()
		}, [user])
	)

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack.Screen
					options={{
						header: () => <View></View>,
					}}
				></Stack.Screen>

				<WishList list={list} count={count} />
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default Wishlists
