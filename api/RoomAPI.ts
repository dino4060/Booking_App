import { ApiRes } from "@/interface/API"
import { Room } from "@/interface/Room"
import { SearchOptions } from "@/interface/SearchOptions"
import { axiosClient } from "./AxiosClient"

const ROOM_PUBLIC_API = "/api/public/rooms"

export const RoomAPI = {
	getRoom: async (
		getRoomCondition: SearchOptions | null
	) => {
		try {
			const res = await axiosClient.get(ROOM_PUBLIC_API)
			if (res.data.success === false)
				console.error(res.data.message)
			console.log(res.data.data)

			return res.data as ApiRes<Room[]>
		} catch (error) {
			console.error(error)
		}
	},
	getRoomById: async (id: string) => {
		try {
			const queryString = (
				"/room/getRoomInfo?room_id=" + id
			).trim()
			const res = await axiosClient.get(queryString)

			if (res.status === 200) {
				return res
			}
		} catch (error) {
			console.log(error)
		}
	},
	reservation: async (
		user_id: string,
		room_id: string,
		start_date: string,
		end_date: string,
		token: string
	) => {
		const result = await axiosClient.post(
			"/booking/bookRoom",
			{
				user_id,
				room_id,
				start_date,
				end_date,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)

		if (result.status === 201) return true
		else return false
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

/**
 * GET /booking/getTrip (user_id) --> get trips of user by id
 *
 *
 *
 *
 *
 */
