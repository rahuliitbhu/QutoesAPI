import React,{useState} from 'react'
import { useMutation } from '@apollo/client'
import { Link ,useNavigate} from 'react-router-dom'
import { LOGIN_USER } from '../GraphqlOperation/mutations'

export default function Login() {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()
    const [formData,setForm]=useState({})
    const [loginUser,{error,loading,data}]=useMutation(LOGIN_USER,{onCompleted(data){
        localStorage.setItem("token",data.user.token)
        navigate("/")
    }})  

    if(loading) return <h1>Loading.....</h1>  
  /*   
    if(data)
    {
        localStorage.setItem("token",data.user.token)
        navigate("/")
    }
*/
    const handleForm=(e)=>{
        setForm({
            ...formData,
            [e.target.name]:e.target.value


        })

    }

    const handleSubmit= (event)=>{
         event.preventDefault()//prevent refresh of whole page
       //  console.log(formData)
       loginUser({
        variables:{
            userSignin:formData
        }
    })


        // navigate("/")// this is programatically navigate it will automatically will be called on submit and redirect us to given path or page
    }
   // onchange={(event)=>handleForm(event) }and onchange={handleForm}  is same thing react will automatically will pass event
    return (
        <div   className="container my-container">

            {
                error &&
                <div className='red card-panel'> {error.message}  </div>
            }

            <form onSubmit={(event)=>handleSubmit(event)}>
  
    <label >Email address</label>
    <input type="email" 
    name='email'
    onChange={(event)=>handleForm(event)} required
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
 
  
    <label >Password</label>
    <input type="password"
     name='password'
     onChange={(event)=>handleForm(event)} required
    />

    <Link to="/signup"><p>If not have account click for signup</p></Link>

  <button type="submit" className="#01579b light-blue darken-4" >Submit</button>
</form> 
            
        </div>
    )
}
