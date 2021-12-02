import React,{useState,useEffect} from 'react';
import Layout from '../core/layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'
import {getProducts,deleteProduct} from './ApiAdmin'

const ManageProducts = ()=>{
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data.data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const showProductsLength = ()=>{
        
            return(
                <h2>Total Products : {products.length}</h2>
            )

    }

    return (
        <Layout title='Manage Products' 
                description='Perform CRUD on Products' className='container'>
                <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        {showProductsLength()}
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                            key={i}
                            className="list-group-item 
                                       d-flex justify-content-between 
                                       align-items-center">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge 
                                                     badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                className="badge badge-danger badge-pill"
                                style={{cursor:'pointer'}}
                                    >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>  
    )
}

export default ManageProducts
