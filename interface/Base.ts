export type TApiResSuccess<T> = {
	success: true
	code: number
	data: T
}

export type TApiResFail = {
	success: false
	code: number
	message: string
}

export type TApiRes<T> = TApiResSuccess<T> | TApiResFail

export type TPageParam = {
	page?: number
	size?: number
	sort?: string
	direction?: "ASC" | "DESC"
}

export type TPageData<T> = {
	totalPages: number
	totalItems: number
	page: number
	size: number
	items: T[]
}
