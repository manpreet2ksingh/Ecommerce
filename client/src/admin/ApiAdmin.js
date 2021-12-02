export const CreateCategory = async (userId,token,category)=>{
    return await fetch(`/api/category/create/${userId}`,{
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

export const CreateProduct = async (userId,token,product)=>{
    return await fetch(`/api/product/create/${userId}`,{
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

export const getCategories = async () =>{
    return await fetch(`/api/categories`,{
        method:'GET'
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const listOrders = async (userId,token) =>{
    return await fetch(`/api/order/list/${userId}`,{
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

export const getStatusValues = async (userId,token) =>{
    return await fetch(`/api/order/status-values/${userId}`,{
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

export const updateOrderStatus = async (userId,token,orderId,status) =>{
    return await fetch(`/api/order/${orderId}/status/${userId}`,{
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

export const getProducts = async ()=>{
    return await fetch(`/api/products?limit=100`,{
        method:"GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(error => console.log(error))
}

// to get single product
export const getProduct = async (productId)=>{
    return await fetch(`/api/product/${productId}`,{
        method:"GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(error => console.log(error))
}

export const deleteProduct = async (productId,userId,token) =>{
    return await fetch(`/api/product/${productId}/${userId}`,{
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

export const updateProduct = async (productId,userId,token,product) =>{
    return await fetch(`/api/product/${productId}/${userId}`,{
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