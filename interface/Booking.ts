import { TRoom } from "./RoomType"

export interface Booking {
	__v: number
	_id: string
	created_at: string
	end_date: string
	room: TRoom
	room_id: string
	start_date: string
	total: number
	user_id: string
}
