import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USERS } from '../GraphqlOperation/mutations'

export default function SignUp() {

    

    const [formData,setForm]=useState({})

    const [signupUser,{data,loading,error}]=useMutation(SIGNUP_USERS)  
    // remember use query returns array contains 2 parameter where  first parameter is method which we can call in handleForm method
    // second is data then loading then error

                                        
    if(loading) return <h1>Loading.....</h1>                                    
    const handleForm=(e)=>{
        setForm({
            ...formData,
            [e.target.name]:e.target.value


        })

    }

    const handleSubmit= (event)=>{
         event.preventDefault()//prevent refresh of whole page
         //console.log(formData)
         signupUser({
             variables:{
                 userNew:formData
             }
         })
    }
   // onchange={(event)=>handleForm(event) }and onchange={handleForm}  is same thing react will automatically will pass event
    return (
        <div   className="container my-container">

            {
                error &&
                <div className='red card-panel'> {error.message}  </div>
            }
               {
                data && data.user &&
                <div className='green card-panel'> {data.user.firstName} is SignedUp Successfully.Now login </div>
            }

            <h5>SignUp</h5>
        
            <form onSubmit={(event)=>handleSubmit(event)}>

            <label >First Name</label>
    <input type="text" 
    name='firstName' //remember it's name should match with schema name
    onChange={(event)=>handleForm(event)} required
    />
     <label >Last Name</label>
    <input type="text" 
    name='lastName'
    onChange={(event)=>handleForm(event)} required
    />

    <label >Email address</label>
    <input type="email" 
    name='email'
    onChange={(event)=>handleForm(event)} required
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
 
  
    <label >Password</label>
    <input type="password"
     name='password'
     onChange={handleForm} required
    />

   
  <Link to="/login"><p>If  have account click for login</p></Link>

  <button type="submit" className="#01579b light-blue darken-4" >Submit</button>
</form> 
            
        </div>
    )
}
