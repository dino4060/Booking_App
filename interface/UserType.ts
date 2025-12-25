import { TRoom } from "./RoomType"

export interface User {
	_id: string
	name: string
	email: string
	createdAt?: Date
	username?: string
	phone?: string
	avatarUrl?: string
	isLogin: boolean
}

export interface THost {
	user: User
	hostedList: TRoom[]
}

export type TAuth = {
	accessToken: string
	currentUser: User
}
