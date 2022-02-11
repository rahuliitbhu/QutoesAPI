import { useQuery } from '@apollo/client'
import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_QUOTES } from '../GraphqlOperation/queries'

export default function Home() {

/*
useEffect(()=>{
    fetch('http://localhost:4000/',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            query:`
          
              query getUserbyId($user_id:ID!){
                user(_id:$user_id)
                {
                  _id
                  firstName
                  lastName
                  email
                
                }
              }
            
            
            `
            ,
            variables:{
                user_id: "61d99e7d96239998f728334c"
            }
        })
    }).then(res=>res.json())
    .then(data=>console.log(data))
   
},[])
*/// above method is traditional method for req calling in graphql from frontend

    
const {loading,error,data}=useQuery(GET_ALL_QUOTES,{
    fetchPolicy:cache-and-network
})

if(loading) return <h1>Loading.....</h1>
/*
if(error){
    console.log(error.message)
}

*/


return (
        <div className="container my-container" >

            {
               data.quotes.map(quote=>{
                   return ( <blockquote>
                    <h5>{quote.value}</h5>
                   <Link to={`/profile/${quote.by._id}`}><p className='right-align'>~{quote.by.firstName}</p></Link> 
                   
                </blockquote>)
               })

            }
        
        </div>
    )
}
