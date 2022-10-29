import { atom } from 'jotai'

export const authTokenAtom = atom(localStorage.getItem("token") ?? '')

export const authUserAtom = atom<any>(null) 
