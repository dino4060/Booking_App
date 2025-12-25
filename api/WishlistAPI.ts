import { InternetException } from "@/assets/data/default"
import {
	TApiResFail,
	TApiResSuccess,
	TPageData,
	TPageParam,
} from "@/interface/Base"
import { TLikedRoom } from "@/interface/Wishlist"
import { axiosClient } from "./AxiosClient"

export const WishlistAPI = {
	likeRoom: async (token: string, roomId: number) => {
		try {
			const response = await axiosClient.post(
				`/api/wish-lists/rooms/${roomId}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data as TApiResSuccess<{}>
		} catch (error: any) {
			if (error.response) {
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},

	unlikeRoom: async (token: string, roomId: number) => {
		try {
			const response = await axiosClient.delete(
				`/api/wish-lists/rooms/${roomId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data as TApiResSuccess<{}>
		} catch (error: any) {
			if (error.response) {
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},

	paginateRooms: async (
		token: string,
		params?: Partial<TPageParam>
	) => {
		try {
			const response = await axiosClient.get(
				"/api/wish-lists/rooms",
				{
					params: {
						page: params?.page ?? 1,
						size: params?.size ?? 10,
						sort: params?.sort ?? "id",
						direction: params?.direction ?? "DESC",
					},
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data as TApiResSuccess<
				TPageData<TLikedRoom>
			>
		} catch (error: any) {
			if (error.response) {
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},

	getWishListByUserId: async (
		user_id: string,
		token: string
	) => {
		try {
			const url = `/wishList/getWishList?user_id=${user_id}`
			console.log("user_id ", user_id)
			console.log("token ", token)
			const res = await axiosClient.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log("status: ", res.status)
			return res.data
		} catch (error) {
			return { data: [] }
		}
	},
	addToWishlist: async (
		user_id: string,
		room_id: string,
		token: string
	) => {
		try {
			const res = await axiosClient.post(
				"/wishList/addWishList",
				{
					user_id,
					room_id,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			if (res.status === 201) return res
		} catch (error) {
			console.log("error at add to wishlist: ", error)
		}
	},
	removeFromWishlist: async (
		user_id: string,
		room_id: string,
		token: string
	) => {
		try {
			const url = `/wishList/removeWishList?user_id=${user_id}&room_id=${room_id}`
			console.log("url remove wishlist=>>", url)
			const res = await axiosClient.delete(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})

			console.log("res at remove wishlist =>>>>", res)
		} catch (error) {
			console.log("res at call remove wishlist =>>>", error)
		}
	},
}
