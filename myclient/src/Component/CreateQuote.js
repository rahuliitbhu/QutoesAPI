
import React,{useState} from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate} from 'react-router-dom'
import { CREATE_QUOTE } from '../GraphqlOperation/mutations'
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../GraphqlOperation/queries'

export default function CreateQuote() {
    const [formData,setForm]=useState({})
    const navigate =useNavigate()
    const [signupUser,{data,loading,error}]=useMutation(CREATE_QUOTE,{
        // refetchQueries is do refeching or refresh for  new data added recently to show 
        refetchQueries:[GET_ALL_QUOTES, // queries
            'GetAllQuotes'], 
            refetchQueries:[GET_MY_PROFILE, // queries
                'Myprofile'], 
                       //operation name 
        onCompleted(data){
            navigate("/profile")
        }
    })  
    // remember use query returns array contains 2 parameter where  first parameter is method which we can call in handleForm method
    // second is data then loading then error

                                        
    if(loading) return <h1>Loading.....</h1>     
                                  
    const handleForm=(e)=>{
        setForm({
            
            [e.target.name]:e.target.value


        })

    }

    const handleSubmit= (event)=>{
         event.preventDefault()//prevent refresh of whole page
        
         signupUser({
             variables:{
                 value:formData.value
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
                data &&
                <div className='green card-panel'> Saved Successfully </div>
            }

            <h5>Quotes</h5>
        
            <form onSubmit={(event)=>handleSubmit(event)}>

          
  

 
  
    <input type="text"
     name='value'
     placeholder='Write Your Quote'
     onChange={handleForm} required
    />

   
  

  <button type="submit" className="#01579b light-blue darken-4 btn"  >Submit</button>
</form> 
            
        </div>
    )
}
