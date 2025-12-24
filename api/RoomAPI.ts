import { InternetException } from "@/assets/data/default"
import { TApiRes, TApiResFail } from "@/interface/Base"
import { Room } from "@/interface/Room"
import { SearchOptions } from "@/interface/SearchOptions"
import { axiosClient } from "./AxiosClient"

export const RoomAPI = {
	listRooms: async (
		getRoomCondition: SearchOptions | null
	) => {
		try {
			const response = await axiosClient.get(
				"/api/public/rooms"
			)
			return response.data as TApiRes<Room[]>
		} catch (error: any) {
			console.error(error)
			if (error.response) {
				console.error("BE error:", error.response.message)
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},
	getRoom: async (id: number) => {
		try {
			const response = await axiosClient.get(
				`/api/public/rooms/${id}`
			)
			return response.data as TApiRes<Room>
		} catch (error: any) {
			console.error(error)
			if (error.response) {
				console.error("BE error:", error.response.message)
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},
	getReservationRoomByUserId: async (
		user_id: string,
		token: string
	) => {
		try {
			const url = `/booking/getTrip?user_id=${user_id}`
			const response = await axiosClient.get(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 200) {
				return response.data.data
			}
		} catch (error) {
			console.log(
				"error at get reservation by user_id ",
				error
			)
		}
	},
}
