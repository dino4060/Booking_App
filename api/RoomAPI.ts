import { InternetException } from "@/assets/data/default"
import { TApiRes, TApiResFail } from "@/interface/Base"
import { TRoom } from "@/interface/Room"
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
			return response.data as TApiRes<TRoom[]>
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
			return response.data as TApiRes<TRoom>
		} catch (error: any) {
			console.error(error)
			if (error.response) {
				console.error("BE error:", error.response.message)
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},
}
