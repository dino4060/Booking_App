import { TPageParam } from "./Base"
import { TRoomShort } from "./RoomType"

export type TLikedRoom = {
	_id: number
	createdAt: string
	updatedAt: string
	isDeleted: boolean
	room: TRoomShort
}

export type TLikedRoomParam = TPageParam & {
	nonPage?: boolean
	destination?: string
}
