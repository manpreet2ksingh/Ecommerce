import React, { useState,useEffect } from 'react'
import Layout from './layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () =>{

    const [productsByArrival,setProductsByArrival] = useState([]);
    const [productsBySell,setProductsBySell] = useState([]);
    const [error,setError] = useState(false);

    const loadProductsByArrival = () =>{
        getProducts('createdAt')
        .then(data=>{
            if(data.error)
            {
                setError(data.error)
            }
            else
            {
                setProductsByArrival(data.data)
            }
        })
    }

    const loadProductsBySell = () =>{
        getProducts('sold')
        .then(data=>{
            if(data.error)
            {
                setError(data.error)
            }
            else
            {
                setProductsBySell(data.data) //data.data is array // data alone object is returned
            }
        })
    }

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])


    return(
        <div>
        <Layout title='Home Page' 
                description='Node React E-commerce App' className='container'>
            <Search />
            <h2 className='mb-4'>Best Sellers</h2>
            <div className='row'>
                {
                    productsBySell.map((product,i)=>(
                        <div key={i} className='col-4 mb-3'>
                            <Card product={product} />
                        </div>
                    ))
                }
            </div>

            <h2 className='mb-4'>New Arrivals</h2>
            <div className='row'>
                {
                    productsByArrival.map((product,i)=>(
                        <div key={i} className='col-4 mb-3'>
                            <Card product={product}/>
                        </div>
                    ))
                }
            </div>
        </Layout>        
    </div>
    )
}

export default Home;