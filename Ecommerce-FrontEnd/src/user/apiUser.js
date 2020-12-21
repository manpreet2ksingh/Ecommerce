import {API} from '../config'

export const read = (userId,token) =>{
    return fetch(`${API}/user/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const update = (userId,token,data) =>(
    fetch(`${API}/user/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)

// for updation of info in the local storage

export const updateUser = (user,next)=>{
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}

export const getPurchaseHistory = (userId,token) =>{
    return fetch(`${API}/order/by/user/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}