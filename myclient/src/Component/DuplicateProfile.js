import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { DELETE_QUOTE } from '../GraphqlOperation/mutations'

import { GET_MY_PROFILE, GET_PROFILE_BY_ID } from '../GraphqlOperation/queries'


export default function DuplicateProfile() {



    const {user_id}=useParams()
    const navigate=useNavigate()
    const {loading,error,data}=useQuery(GET_PROFILE_BY_ID ,{
        variables:{
            user_id:user_id
        }
    })
/*
    const [deletequote]=useMutation(DELETE_QUOTE,{
        refetchQueries:[GET_MY_PROFILE, // queries
            'Myprofile']
    })
*/  
    
  /*  if(user_id){
        console.log(user_id)
    }*/

    if(loading) return <h1>Loading.....</h1>
    /*
if(error){
    console.log(error.message)
}*/



    return (
        <div className="container my-container" >
             
             
            <div className='center '>
                <img className='circle' style={{border:"2px solid",marginTop:"5px"}} src={`https://robohash.org/${data.user.firstName}.png?size=250x250`} alt="pic"     />
                <h2 className='center '>{data.user.firstName}</h2>
                <h6 className='center'>`email-{data.user.email}`</h6>
            </div>
                 
           
            <ul class="collection lg ">

            {
              

              data.user.quotes.map(quote=>{
               
                  return ( 
               

                    <li className="collection-item avatar">

                      
                          
                        <img src={`https://robohash.org/${data.user.firstName}.png`} alt="" className="circle align-centre"/>
                  
                           <blockquote  className='quote-size'>
                          
                               
                               <h4>{quote.value}</h4>
                            
                            </blockquote>
                       


                     </li>
                       
                               
                  
               )
           }
              )
           }
          </ul>
               
        </div>
    )
}
