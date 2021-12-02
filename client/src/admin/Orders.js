import React,{useState,useEffect} from 'react';
import Layout from '../core/layout'
import {isAuthenticated} from '../auth/index'
import {listOrders,getStatusValues,updateOrderStatus} from './ApiAdmin'
import moment from 'moment'

const Orders = ()=>{

    const [orders,setOrders] = useState([])
    const [statusValues,setStatusValues] = useState([])

    const {user,token} = isAuthenticated()

    const loadOrders = ()=>{
        listOrders(user._id,token)
        .then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else
            {
                setOrders(data)
            }
        })
    }

    const loadStatusValues = ()=>{
        getStatusValues(user._id,token)
        .then(data=>{   
           setStatusValues(data)
           //console.log(data);
        })
    }

    useEffect(()=>{
        loadOrders()
        loadStatusValues()
    },[])

    const showOrdersLength = ()=>{
        if(orders.length > 0)
        {
            return(
                <h1 className='text-danger display-2'>
                    Total Orders: {orders.length}
                </h1>
            )
        }
        else
        {
            return (
                <h1 className='text-danger'>No Orders</h1>        
            )
        }
    }

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e,orderId)=>{
        updateOrderStatus(user._id,token,orderId,e.target.value)
        .then(data=>{
            if(data.error)
            {
                console.log("Error updating status")
            }
            else
            {
                loadOrders()
            }
        })
    }


    const showStatus = order => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {order.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, order._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return( 
        <Layout title='Orders' 
                description={`G'day ${user.name}, Manage your Orders here`}>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
                {showOrdersLength()}
                {orders.map((order,i)=>(
                    <div className='mt-5' key={i} 
                         style={{borderBottom:"5px solid indigo"}}>
                    
                    <h2 className='mb-5'>
                        <span>
                            Order ID: {order._id}
                        </span>
                    </h2>
                    <ul className='list-group mb-2'>
                        <li className='list-group-item'>
                            {showStatus(order)}
                        </li>
                        <li className='list-group-item'>
                            Transaction ID:{order.transaction_id}
                        </li>
                        <li className='list-group-item'>
                            Amount: ${order.amount}
                        </li>
                        <li className='list-group-item'>
                            Ordered By: {order.user.name}
                        </li>
                        <li className='list-group-item'>
                            Ordered On: {moment(order.createdAt).fromNow()}
                        </li>
                        <li className='list-group-item'>
                            Delivery Address: {order.address}
                        </li>
                    </ul>
                    <h3 className='mt-4 mb-4 font-italic'>
                        Total products in order: {order.products.length}
                    </h3>
                    {order.products.map((p, pIndex) => (
                        <div
                            className="mb-4"
                            key={pIndex}
                            style={{
                                padding: "20px",
                                border: "1px solid indigo"
                            }}
                        >
                            {showInput("Product name", p.name)}
                            {showInput("Product price", p.price)}
                            {showInput("Product total", p.count)}
                            {showInput("Product Id", p._id)}
                        </div>
                    ))}
                    </div>
                ))}
            </div>
          </div>

        </Layout>
    )  

}

export default Orders
