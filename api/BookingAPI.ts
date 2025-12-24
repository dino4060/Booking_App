import { InternetException } from "@/assets/data/default"
import { ApiRes, TApiResFail } from "@/interface/API"
import { axiosClient } from "./AxiosClient"

export const BookingAPI = {
	book: async (
		roomId: string,
		startDate: string,
		endDate: string,
		total: number,
		token: string
	) => {
		try {
			const response = await axiosClient.post(
				"/api/bookings",
				{
					roomId,
					startDate,
					endDate,
					total,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response.data as ApiRes<any>
		} catch (error: any) {
			console.error(error)
			if (error.response) {
				return error.response.data as TApiResFail
			}
			return InternetException
		}
	},
}
