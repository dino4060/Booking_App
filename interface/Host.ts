import { Room } from "./Room"

interface User {
	_id: string
	name: string
	email: string
	password: string
	created_at?: Date
	phone_number?: string
}

export interface Host {
	user: User
	hostedList: Room[]
}
