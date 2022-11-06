import { atom } from 'jotai'
import { API } from '../configs/api'

export const authTokenAtom = atom(localStorage.getItem("token") ?? '')
authTokenAtom.debugLabel = 'authTokenAtom'


export const authUserAtom = atom<any>(null)
authUserAtom.debugLabel = 'authUserAtom'

export const refetchAuthUserAtom = atom(
    null,
    (get, set, update) => {
        set(authUserAtom, async () => {
            let ress = await API.user();
            return ress?.data?.data;
        })
    }
)

export const authForgotPasswordAtom = atom({
    token: '',
    email: ''
})

authForgotPasswordAtom.debugLabel = 'authForgotPasswordAtom'