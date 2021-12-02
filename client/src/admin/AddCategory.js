import React,{useState} from 'react';
import Layout from '../core/layout'
import {isAuthenticated} from '../auth/index'
import {CreateCategory} from './ApiAdmin'
import {Link} from 'react-router-dom'


const AddCategory = () => {
    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    // destructuring name and token
    const {user,token} = isAuthenticated();

    const handleChange = (e)=>{
        setError(false)
        setSuccess(false)
        setName(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setError(false);
        setSuccess(false);
        // make request to API
        CreateCategory(user._id,token,{name})
        .then(data =>{
            if(data.error)
            {
                setError(data.error)
            }else{
                setName('')
                setError(false)
                setSuccess(true)
            }
        })
    }

    const showSuccess = ()=>{
        if(success){
            return <h3 className='text-success'>
                         Category {name} is created
                   </h3>
        }
    }

    const showError = ()=>{
        if(error){
            return <h3 className='text-danger'>
                Category should be unique.{name} is already created.
                </h3>
        }
    }

    const goBack = ()=>(
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>
                  Back to dashboard
            </Link>
        </div>
    )

    const newCategoryForm = () =>(
        <form onSubmit={handleSubmit}>
            <div className = 'form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' 
                       className='form-control'
                       onChange = {handleChange}
                       value={name}
                       autoFocus
                       required />       
            </div>
            <button className='btn btn-outline-primary'>
                Create Category
            </button>
        </form>
    )

    return( 
        <Layout title='Add a New Category' 
                description={`G'day ${user.name}!`}>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
                {showError()}
                {showSuccess()}
                {newCategoryForm()}
                {goBack()}
            </div>
          </div>

        </Layout>
    )    

}
export default AddCategory;