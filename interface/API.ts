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

export type ApiRes<T> = TApiResSuccess<T> | TApiResFail
