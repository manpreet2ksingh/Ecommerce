import {API} from '../config'

export const CreateCategory = (userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const CreateProduct = (userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: product
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:'GET'
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const listOrders = (userId,token) =>{
    return fetch(`${API}/order/list/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const getStatusValues = (userId,token) =>{
    return fetch(`${API}/order/status-values/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const updateOrderStatus = (userId,token,orderId,status) =>{
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({orderId,status})
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

/*
to get all the products
to get single product
to update or delete single product
*/

export const getProducts = ()=>{
    return fetch(`${API}/products?limit=100`,{
        method:"GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(error => console.log(error))
}

// to get single product
export const getProduct = (productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(error => console.log(error))
}

export const deleteProduct = (productId,userId,token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'DELETE',
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

export const updateProduct = (productId,userId,token,product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}