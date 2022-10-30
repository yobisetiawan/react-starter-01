import axios from "axios";

const apiUrl = 'http://localhost/api/v1'
const tokenPublickey = 'xxx'


const bearerAuth = () => {
    return 'Bearer ' + localStorage.getItem("token");
}

const config = (params?: any) => ({
    params: params,
    headers: {
        Authorization: bearerAuth(),
        'x-public-token': tokenPublickey,
    },
})

export const ManualFetchAPI = {
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: false
}

export const API = {
    login: (data: any) => axios.post(apiUrl + '/auth/login', data),
    logout: () => axios.post(apiUrl + '/auth/logout', {}, config()),
    register: (data: any) => axios.post(apiUrl + '/auth/register', data),
    user: () => axios.get(apiUrl + '/user?relations=' + (['avatar'].join()), config()),
    userChangeProfile: (data: any) => axios.post(apiUrl + '/user/change-profile', data, config()),
    userChangeAvatar: (data: any) => axios.post(apiUrl + '/user/change-avatar', data, config()),
    userChangePassword: (data: any) => axios.post(apiUrl + '/user/change-password', data, config()),
    userDeleteAccount: () => axios.delete(apiUrl + '/user', config()),

    exampleSampleList: (data: any) => axios.get(apiUrl + '/example/samples', config(data)),
    exampleSamplePost: (data: any) => axios.post(apiUrl + '/example/samples', data, config()),
    exampleSamplePut: (id: string, data: any) => axios.put(apiUrl + '/example/samples/' + id, data, config()),
    exampleSampleDestroy: (id: string) => axios.delete(apiUrl + '/example/samples/' + id, config()),

}