import React,{useState,useEffect} from 'react'


const Checkbox = ({categories,handleFilters})=>{

    const [checked,setChecked] = useState([])

    const handleToggle = c =>()=>{ // c - category id
        // indexOf - returns first found index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
// if checked category is already present then pull/take it of else push it into 
// checked state
        if(currentCategoryId == -1)
        {
            newCheckedCategoryId.push(c);
        }
        else
        {
            newCheckedCategoryId.splice(currentCategoryId,1);
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return(
        categories.map((c,i)=>(
            <li className='list-unstyled' key={i}>
                <input onChange={handleToggle(c._id)} 
                       className='form-check-input' 
                       type='checkbox'
                       value={checked.indexOf(c._id) === -1}/>
                <label className='form-check-label'>{c.name}</label>
            </li>
        ))
    )
}

export default Checkbox;