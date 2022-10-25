import create from 'zustand'

interface UserState {
  user: any
  setUser: (user: any) => void
  removeUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: 0,
  setUser: (user) => set((state) => ({ user: user })),
  removeUser: () => set({ user: null }),
}))