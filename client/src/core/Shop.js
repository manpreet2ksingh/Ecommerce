import React , {useEffect,useState} from 'react'
import Layout from './layout'
import Card from './Card'
import {getCategories,getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import {prices} from './fixedPrice'
import RadioBox from './RadioBox'

const Shop = () =>{

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)
    const [filteredResults,setFilteredResults] = useState([])

    const [myFilters,setMyFilters] = useState({
        filters:{
            category:[],
            price:[]
        }
    })

    const init = ()=>{
        getCategories()
        .then(data=>{
            if(data.error)
            {
                setError(data.error)
            }
            else
            {
                setCategories(data.categories)           
            }
        })
    }

    const handleFilters = (filters,filterBy) =>{
        // console.log('Shop',filters,filterBy)
        const newFilters = {...myFilters}; 
        newFilters.filters[filterBy] = filters;

        if(filterBy === 'price')
        {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const loadFilteredResults = (newFilters)=>{
        getFilteredProducts(skip,limit,newFilters)
        .then(data =>{
            if(data.error)
            {
                setError(data.error)
            }
            else
            {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
        
    }

    const handlePrice = (value) =>{
        const data = prices;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value) )
            {
                array = data[key].array;
            }
        }
        return array
    }

    const loadMore = () =>{
        let toSkip = skip + limit;
        getFilteredProducts(toSkip,limit,myFilters.filters).then(data=>{
            if(data.error)
            {
                setError(data.error)
            }
            else
            {
                setFilteredResults([...filteredResults,...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () =>{
        return(
            size>0 && size>=limit && (
                <button onClick = {loadMore} 
                        className='btn btn-warning mb5'
                        style={{marginBottom:'20px'}}>
                        Load More
                </button>
            )
        )
    }

    useEffect(()=>{
        init();
        loadFilteredResults(skip,limit,myFilters.filters);
    },[])

    console.log(myFilters.filters)
    return(
            <Layout title='Shop' 
                    description='Search and Find books of your choice.'
                    className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                    <h4>Filter by Categories</h4>
                        <ul>
                            <Checkbox 
                            categories={categories}
                            handleFilters = 
                            {filters=>handleFilters(filters,'category')}
                            />
                        </ul>
                        <h4>Filter by Price</h4>    
                        <div>
                            <RadioBox 
                            prices={prices}
                            handleFilters = 
                            {filters=>handleFilters(filters,'price')}
                            />
                        </div>
                    </div>
                    <div className='col-8'>
                        <h2 className = 'mb-4'>Products</h2>
                        <div className='row'>
                            {
                                filteredResults.map((p,i)=>(
                                    <div key={i} className='col-4 mb-3'>
                                        <Card product={p}/>
                                    </div>
                                ))
                            }
                        </div>
                        <hr/>
                    {loadMoreButton()}    
                    </div>
                </div>
            </Layout>        
    )
}

export default Shop;