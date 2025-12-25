import { TRoom } from "@/interface/Room"
import { create } from "zustand"

type State = {
	homeStayList: TRoom[]
}
type Action = {
	updateHomestayList: (room: State["homeStayList"]) => void
}

export const useHomestayStore = create<State & Action>(
	(set: any) => ({
		homeStayList: [],
		updateHomestayList: (homeStayList: TRoom[]) =>
			set(() => ({ homeStayList })),
	})
)
