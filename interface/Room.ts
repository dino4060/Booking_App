import { User } from "@/store/useUserStore"

export interface Room {
	_id: string
	name?: string
	summary?: string
	transit?: string
	house_rules?: string
	thumbnail_urls?: string[]
	host?: User
	street?: string
	smart_location?: string
	country?: string
	latitude?: number
	longitude?: number
	room_type?: string
	bathRooms?: number
	bedRooms?: number
	beds?: number
	price?: number
	weekly_price?: number
	review?: string
	created_at?: Date
	bookedDate: string[]
}
