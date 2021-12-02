export const read = async (userId,token) =>{
    return fetch(`/api/user/${userId}`,{
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

export const update = async (userId,token,data) =>(
    await fetch(`/api/user/${userId}`,{
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

export const updateUser = async (user,next)=>{
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

export const getPurchaseHistory = async (userId,token) =>{
    return await fetch(`/api/order/by/user/${userId}`,{
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