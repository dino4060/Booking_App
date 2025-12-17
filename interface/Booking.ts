import { Room } from "./Room"

export interface Booking {
	__v: number
	_id: string
	created_at: string
	end_date: string
	room: Room
	room_id: string
	start_date: string
	total: number
	user_id: string
}
