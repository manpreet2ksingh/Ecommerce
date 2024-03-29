export const addItem = (item,next)=>{
    let cart = [];
    
    /* checking if window object is present or not */
    if(typeof window !== 'undefined')
    {
        // JSON.parse - convert json to object
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        
        cart.push({
            ...item,
            count:1
        });

    /*if the product that is already present in cart is clicked again,
    its count should be incremented instead of its another copy in the storage
    Set - returns only distinct products
    then the map function returns them
    and Array from method creates a new array of distinct products*/

    cart = Array.from(new Set(cart.map(p=>p._id))).map((id)=>{
        return cart.find(p => p._id === id)
    })

        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }
}

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};


export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};
export const updateItem = (productId,count) =>{
    let cart = [];
    
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

            
        cart.map((p,i)=>{
            if(p._id === productId)
            {
                cart[i].count = count
            }
        })

        localStorage.setItem('cart',JSON.stringify(cart))
    }  
}


export const removeItem = (productId) =>{
    let cart = [];
    
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((p,i)=>{
            if(p._id === productId)
            {
                cart.splice(i,1);
            }
        })
    
        localStorage.setItem('cart',JSON.stringify(cart))

    }  
    return cart;
}


export const emptyCart = (next)=>{
    if(typeof window!=='undefined')
    {
        localStorage.removeItem('cart')
        next()
    }
}