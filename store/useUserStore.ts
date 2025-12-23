import { User } from "@/interface/User"
import { create } from "zustand"

type State = {
	user: User
}

type Action = {
	updateUser: (user: State["user"]) => void
}

export const DefaultUser = {
	_id: "",
	name: "",
	email: "",
	username: "",
	phone: "",
	isLogin: false,
	createdAt: new Date(),
	avatarUrl: "",
}

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<State & Action>(
	(set) => ({
		user: DefaultUser,
		updateUser: (user: User) => set(() => ({ user })),
	})
)
