import { Room } from "./Room"
import { User } from "./User"

export type TTripStatus =
	| "UPCOMING"
	| "ONGOING"
	| "ENDED"
	| "CANCELED"

export const TripStatusList: TTripStatus[] = [
	"UPCOMING",
	"ONGOING",
	"ENDED",
	"CANCELED",
]

export const TripStatusMap = {
	UPCOMING: {
		name: "UPCOMING",
		display: "Sắp đến",
	},
	ONGOING: {
		name: "ONGOING",
		display: "Đang diễn ra",
	},
	ENDED: {
		name: "ENDED",
		display: "Đã kết thúc",
	},
	CANCELED: {
		name: "CANCELED",
		display: "Đã hủy",
	},
}

export type TTrip = {
	_id: number
	id: number
	createdAt: string
	updatedAt: string
	isDeleted: boolean
	customer: User
	room: Room
	startDate: string
	endDate: string
	bookingTime: string
	total: number
	bookedDates: string[]
	status: TTripStatus
}
