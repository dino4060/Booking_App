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
