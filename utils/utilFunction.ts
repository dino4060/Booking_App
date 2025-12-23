export const UtilFunction = {
	calcDate: (startDate: string, endDate: string) => {
		if (startDate == "" || endDate == "") return 0

		// Convert start and end dates to milliseconds
		const startMs = new Date(startDate).getTime()
		const endMs = new Date(endDate).getTime()

		// Calculate the difference in milliseconds
		const differenceMs = Math.abs(endMs - startMs)

		// Convert milliseconds to days
		const days = Math.ceil(
			differenceMs / (1000 * 60 * 60 * 24)
		)

		return days
	},
	formatToHostSince: (isoTimestamp: Date) => {
		const date = new Date(isoTimestamp)
		const day = date
			.getUTCDate()
			.toString()
			.padStart(2, "0")
		const month = (date.getUTCMonth() + 1)
			.toString()
			.padStart(2, "0")
		const year = date.getUTCFullYear()
		return `${day}/${month}/${year}`
	},
}

export function createQueryString(params: any) {
	let queryString = ""
	for (const key in params) {
		if (
			params.hasOwnProperty(key) &&
			params[key] !== null
		) {
			if (queryString.length > 0) {
				queryString += "&"
			}
			queryString += `${key}=${encodeURIComponent(
				params[key]
			)}`
		}
	}
	return queryString
}
