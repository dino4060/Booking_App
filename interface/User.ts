import { TRoom } from "./Room"

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

export interface Host {
	user: User
	hostedList: TRoom[]
}

export type TAuth = {
	accessToken: string
	currentUser: User
}
