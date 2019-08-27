import axios from 'axios'

export const getCategories = () =>{
    return{
        type:"GET_CATEGORIES",
        payload:axios.get('http://192.168.6.121:3300/category',null,{
            headers:{
                "authorization":"Allow"
            }
        })
    }
}
