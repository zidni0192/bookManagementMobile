import axios from 'axios'

export const getBooks = (keyword) =>{
    return{
        type:"GET_BOOKS",
        payload:axios.get(`http://192.168.6.121:3300/books/?search=${keyword}`,null,{
            headers:{
                "authorization":"Allow"
            }
        })
    }
}

export const getBook = (id) =>{
    return{
        type:"GET_BOOK",
        payload:axios.get(`http://192.168.6.121:3300/books/${id}`,null,{
            headers:{
                "authorization":"Allow"
            }
        })
    }
}

export const postBook = (data) => {
    return{
        type:"POST_BOOK",
        payload:axios.post('http://192.168.6.121:3300/books',data,{
            headers:{
                "authorization":"Allow"
            }
        }),
    }
}

export const patchBook = (data,id,category) => {
    return{
        type:"PATCH_BOOK",
        payload:axios.patch(`http://192.168.6.121:3300/books/${id}`,{...data,category:category},{
            headers:{
                "authorization":"Allow"
            }
        })
    }
}

export const deleteBook = (id) => {
    return{
        type:"DELETE_BOOK",
        payload:axios.delete(`http://192.168.6.121:3300/books/${id}`,null,{
            headers:{
                "authorization":"Allow"
            }
        })
    }
}

export const postDonasi = (data) =>{
    console.log(data);
    
    return{
        type:"POST_DONASI",
        payload:axios.post('http://192.168.6.121:3300/books/donate',data,{
            headers:{
                "authorization":"Allow",
                'Content-Type':'application/json'
            }
        }),
    }
}