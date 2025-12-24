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
