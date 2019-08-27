import axios from 'axios'
import {AsyncStorage} from 'react-native'
const localStorage = {
    token : AsyncStorage.getItem('token').then((result)=>{
        return result
    }),
    id : AsyncStorage.getItem('id').then((result)=>{
        return result
    })
}
export const getUsers = (token,idUser) => {
    return {
        type: "GET_USERS",
        payload: axios.get(`http://192.168.6.121:3300/user`,null,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}

export const getByEmail = (data) => {
    return {
        type: "GET_BY_EMAIL",
        payload: axios.post(`http://192.168.6.121:3300/user/login/`,data,{
            headers:{
                "authorization":"Allow",
            }
        })
    }
}

export const register = (data) => {
    return {
        type: "REGISTER",
        payload:axios.post(`http://192.168.6.121:3300/user/register`,data,{
            headers:{
                "authorization":"Allow",
                
            }
        })
    }
}

export const getToken = (token,idUser) =>{
    return{
        type: "GET_TOKEN",
        payload:axios.post(`http://192.168.6.121:3300/user/getToken`,null,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}
