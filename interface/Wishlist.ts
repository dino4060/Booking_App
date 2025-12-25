import { TRoomShort } from "./Room"

export type TLikedRoom = {
	_id: number
	createdAt: string
	updatedAt: string
	isDeleted: boolean
	room: TRoomShort
}
