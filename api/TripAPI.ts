import { InternetException } from "@/assets/data/default"
import {
	TApiResFail,
	TApiResSuccess,
} from "@/interface/Base"
import { TripStatusMap, TTrip } from "@/interface/Trip"
import { axiosClient } from "./AxiosClient"

export const TripAPI = {
	cancelTrip: async (token: string, tripId: number) => {
		try {
			const response = await axiosClient.patch(
				"/api/trips",
				{
					_id: tripId,
					status: TripStatusMap.CANCELED.name,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data as TApiResSuccess<TTrip>
		} catch (error: any) {
			if (error.response) {
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},
	listTrips: async (token: string) => {
		try {
			const response = await axiosClient.get("/api/trips", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data as TApiResSuccess<TTrip[]>
		} catch (error: any) {
			if (error.response) {
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},
}
