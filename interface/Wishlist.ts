import { User } from "react-native-gifted-chat"
import { Room } from "./Room"

export interface Wishlist {
	__v: number
	_id: string
	room: Room
	room_id: string
	user: User
	user_id: string
}
