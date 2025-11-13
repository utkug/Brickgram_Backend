import { create } from 'zustand'

interface User {
  id: string;
  username: string;
  name: string;
  profile_picture: string;
  is_verified: boolean;
  unread_notifications: number;
}

interface UserState {
    user: User | null,
    setUser: (u: User) => void 
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))