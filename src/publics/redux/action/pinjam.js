import axios from 'axios'
import {AsyncStorage} from 'react-native'
let id = ''
let token = ''
let role = ''
AsyncStorage.getItem('token').then((result)=>{
    token= result
})
AsyncStorage.getItem('id').then((result)=>{
    id= result
})
AsyncStorage.getItem('role').then((result)=>{
    role= result
})

console.warn(id);
console.warn(token);
console.warn(role);


export const getPinjams = (token,idUser) =>{
console.log(idUser)
    return{
        type:"GET_PINJAMS",
        payload:axios.post(`http://192.168.6.121:3300/pinjam/`,{id:id,role:role},{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": 1,
            }
        })
    }
}

export const getPinjam = (id,token,idUser) =>{
    return{
        type:"GET_PINJAM",
        payload:axios.get(`http://192.168.6.121:3300/pinjam/${id}`,null,{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": id
            }
        })
    }
}

export const postPinjam = (data,token,idUser) => {
    console.warn(id);
    console.warn(token);
    console.warn(role);
    
    return{
        type:"POST_PINJAM",
        payload:axios.post('http://192.168.6.121:3300/pinjam/post',{...data,id_user:id,role:role},{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": id
            }
        }),
    }
}

export const patchPinjam = (data,id,token,idUser) => {
    return{
        type:"PATCH_PINJAM",
        payload:axios.patch(`http://192.168.6.121:3300/pinjam/${id}`,data,{
            headers:{
                "x-access-token":`bearer ${token}`,
                "authorization":"Allow",
                "x-control-user": id
            }
        })
    }
}