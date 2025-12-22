export type ApiRes<T> = {
	success: boolean
	code: number
	message: string
	data: T
}
