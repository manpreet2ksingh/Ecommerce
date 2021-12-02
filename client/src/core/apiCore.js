import queryString from 'query-string'

export const getProducts = async (sortBy) =>(
    await fetch(`/api/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)

export const read = async (productId) =>(
    await fetch(`/api/product/${productId}`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)


export const getCategories = async () =>{
    await fetch(`/api/categories`,{
        method:'GET'
    })
    .then((res)=>{
        console.log(res)
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const getFilteredProducts = async (skip,limit,filters={})=>{
    const data = {limit,skip,filters};
    return await fetch(`/api/products/by/search`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

// queryString - to pass params as string instead passing separately
export const list = async params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return await fetch(`/api/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = async (productId) =>(
    await fetch(`/api/products/related/${productId}`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)

export const getBraintreeClientToken = async (userId,token) =>(
    await fetch(`/api/braintree/getToken/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)

export const processPayment = async (userId,token,paymentData) =>(
    await fetch(`/api/braintree/payment/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)


export const createOrder = async (userId,token,createOrderData) =>(
    await fetch(`/api/order/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:createOrderData})
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)