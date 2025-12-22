import { ApiRes } from "@/interface/API"

export const InternetException: ApiRes<null> = {
	success: false,
	code: 0,
	message: "Lỗi internet",
	data: null,
}

export const AltPhoto = "https://random.imagecdn.app/500/500"