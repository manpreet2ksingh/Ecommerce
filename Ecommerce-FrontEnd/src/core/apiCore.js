import {API} from '../config'
import queryString from 'query-string'

export const getProducts = (sortBy) =>(
    fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)

export const read = (productId) =>(
    fetch(`${API}/product/${productId}`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)


export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:'GET'
    })
    .then((res)=>{
        return res.json()
        })
    .catch(err=>console.log(err))
}

export const getFilteredProducts = (skip,limit,filters={})=>{
    const data = {limit,skip,filters};
    return fetch(`${API}/products/by/search`,{
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
export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = (productId) =>(
    fetch(`${API}/products/related/${productId}`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err =>console.log(err))
)

export const getBraintreeClientToken = (userId,token) =>(
    fetch(`${API}/braintree/getToken/${userId}`,{
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

export const processPayment = (userId,token,paymentData) =>(
    fetch(`${API}/braintree/payment/${userId}`,{
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


export const createOrder = (userId,token,createOrderData) =>(
    fetch(`${API}/order/create/${userId}`,{
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