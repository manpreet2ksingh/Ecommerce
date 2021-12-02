import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/index'
import {getBraintreeClientToken,processPayment,createOrder} from './apiCore'
import Dropin from 'braintree-web-drop-in-react'
import {emptyCart} from './cartHelper'


// run and setRun imported to change the parent Component state
// when emptyCart is run , items are deleted from localStorage but the state isn't
//changed. So setRun is imported to run the useEffect again in Cart Component
//(parent one)
const Checkout = ({products,
                  run=undefined,
                  setRun = f=>f}) =>{

    const [data,setData] = useState({
        success:false,
        error:'',
        clientToken:null,
        instance:{},
        address:''
    })

    let deliveryAddress = data.address

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId,token) =>{
        if(userId)
        {
            getBraintreeClientToken(userId,token)
            .then(data=>{
                if(data.error)
                {
                    setData({...data,error:data.error})
                }
                else
                {
                    setData({...data,clientToken:data.clientToken,success:false})
                }
            })
        }
    }

    useEffect(()=>{
        getToken(userId,token);
    },[])

    const buy = () =>{
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data=>{
            // console.log(data)
            nonce = data.nonce
            // console.log('send nonce and total to process: ',nonce,getTotal())
            const paymentData = {
                paymentMethodNonce:nonce,
                amount:getTotal()
            }

            processPayment(userId,token,paymentData)
            .then(response =>{
                //create order
                console.log(response);

                const createOrderData = {
                    products:products,
                    transaction_id:response.transaction.id,
                    amount:response.transaction.amount,
                    address:deliveryAddress
                }

                createOrder(userId,token,createOrderData)

                //empty cart
                {emptyCart(()=>{
                    console.log('cart cleared')
                    setData({...data,success:true})
                    setRun(!run)
                })}
            })
            .catch(error => console.log(error))

        })
        .catch(error=>{
            console.log('dropin error: ',error)
            setData({...data,error:error.message})
    
        })
    }

    const showError = (error) =>(
        <div className='alert alert-danger' 
             style={{display:error ?'':'none'}}>
            {error}
        </div>
    )

    const showSuccess = (success) =>{

        return <div className='alert alert-info' 
             style={{display:success ?'':'none'}}>
            Payment successfull
        </div>
    }

    const handleAddress = (event)=>{
        setData({...data,address:event.target.value})
    }

    const showDropin = ()=>(
        <div onBlur = {()=>{setData({...data,error:''})}}>
            {products.length>0 && data.clientToken!==null ? (
                <div>

                <div className="form-group mb-3">
                    <label className="text-muted">Delivery address:</label>
                    <textarea
                        onChange={handleAddress}
                        className="form-control"
                        value={data.address}
                        placeholder="Type your delivery address here..."
                    />
                </div>

                    <Dropin options={{
                        authorization:data.clientToken
                    }}
                    onInstance={instance => data.instance = instance}/>
                    <button onClick={buy} className='btn btn-success btn-block'>
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    )

    const getTotal =  ()=>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue + nextValue.count*nextValue.price
        },0)
    }

    const showCheckout = () =>{
        return isAuthenticated() ? (
            <div>{showDropin()}</div>
        ) : (
            <Link to='/signin'>
                <div className='btn btn-primary'>
                    Signin for checkout
                </div>
            </Link>
        )
    }

    return (
        <div>
            <h2>Total: ${getTotal()} </h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout;