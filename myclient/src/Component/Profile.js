import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DELETE_QUOTE } from '../GraphqlOperation/mutations'

import { GET_MY_PROFILE } from '../GraphqlOperation/queries'


export default function Profile() {




    const navigate=useNavigate()
    const {loading,error,data}=useQuery(GET_MY_PROFILE)

    const [deletequote]=useMutation(DELETE_QUOTE,{
        refetchQueries:[GET_MY_PROFILE, // queries
            'Myprofile']
    })

   if(!localStorage.getItem("token")){
       
       navigate("/login")
       
       return <h1>Unauthorise Access</h1>
   }


    if(loading) return <h1>Loading.....</h1>



    return (
        <div className="container my-container" >
             
             
            <div className='center '>
                <img className='circle' style={{border:"2px solid",marginTop:"5px"}} src={`https://robohash.org/${data.prof.firstName}.png?size=250x250`} alt="pic"     />
                <h2 className='center '>{data.prof.firstName}</h2>
                <h6 className='center'>`email-{data.prof.email}`</h6>
            </div>
                 
           
            <ul className="collection lg ">

            {
              

              data.prof.quotes.map(quote=>{
               
                  return ( 
               

                    <li className="collection-item avatar">

                      
                          
                        <img src={`https://robohash.org/${data.prof.firstName}.png`} alt="pic" className="circle align-centre"/>
                  
                           <blockquote  >
                          
                               
                               <h4>{quote.value}</h4>
                            
                   
                           <a href="#!" className="secondary-content quote-size">{
                                <i className='material-icons ' onClick={
                                    (event)=>{
                                      event.preventDefault()//prevent refresh of whole page
                                     
                                      deletequote({
                                          variables:{
                                              _id:quote._id
                                          }
                                      }
                                      )
                                      
                                 }  }  >delete</i>   
                                 
                                 
                                
                            }</a>
                            
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
