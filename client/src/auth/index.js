
export const signup = async (user)=>{
    //console.log(name,email,password);
    return await fetch(`/api/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const signin = async (user)=>{
    
    return await fetch(`/api/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const authenticate = (data,next)=>{
    if(typeof window != 'undefined')
    {
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
}


/*signout - 
remove from localStorage 
get request to backend
redirect to home page 
*/
export const signout = async (next)=>{
    if(typeof window != 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
        await fetch(`/api/signout`,{
            method:'GET'
        })
        .then(response =>console.log('signout',response))
        .catch(error =>console.log(error));
    }
}

export const isAuthenticated = ()=>{
    if(typeof window == 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('jwt'))
    {
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
}