

import {quotes,users} from "./fakedb.js"
import {randomBytes} from 'crypto'

import mongoose from "mongoose"

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"
//import { JWT_SECRET } from "./config.js"
import { graphqlSync } from "graphql"

const User = mongoose.model("User")

const Quote=mongoose.model("Quote")
const resolvers ={

    Query:{
        greet:()=>{
            return "Hello world"
        },
        users:async ()=>{return await User.find({})
            
        
        },
        user:async(_,{_id})=>{
              return await User.findOne({_id:_id})

        },//user.find(user=>user._id==_id),
        quotes:async()=>{
            return await Quote.find({}).populate("by","_id firstName")
         

        },
        iquote:async(_,{by})=> {return  await Quote.find({by:by})},
        myProfile:async(_,name,{userId})=>{
            if(!userId) { throw new Error("You must be login")}
            return await User.findOne({_id:userId})

          }



    },
    User:{
        quotes:async(user)=>
        {
               
            
            return await Quote.find({by:user._id})
      
        }

    },

    Mutation:{

   

          signupUser:async (_,{userNew})=>{

               const user =  await User.findOne({email:userNew.email});
               if(user)
               {
                   throw new Error("User Exists with this email")
               }

              const hasedpassword = await  bcrypt.hash(userNew.password,12)
             const newUser=  new User({
                  ...userNew,
                  password:hasedpassword
              })
              
             return await newUser.save()
          },


          signinUser:async (_,{userSignin})=>{

            const user =  await User.findOne({email:userSignin.email});
            if(!user)
            {
                throw new Error("User Not Exists with this email Please Signup")
            }

            const doMatch = await bcrypt.compare(userSignin.password,user.password)
            if(!doMatch)
            {
                throw new Error("Wrong Password or Email")
            }
            
          const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
           return {token}

          },

          createQuote:async (_,{value},{userId})=>{
                   
            if(!userId) { throw new Error("You must be login")}
           
            const newQuote = new Quote({
                value,
                by:userId
            })
             await newQuote.save()

             return "Saved"
              
          },

          deleteAccount:async(_,name,{userId})=>{
         
            if(!userId) { throw new Error("You must be login")}

           // const empt=delete await User.findOne({_id:_id})
            
           await User.deleteOne({_id:userId}) 
            return "deleted"

          },
          deleteQuote:async(_,{_id},{userId})=>{
         
            if(!userId) { throw new Error("You must be login")}

           // const empt=delete await User.findOne({_id:_id})
            
           await Quote.deleteOne({_id:_id}) 
            return "deleted"

          },
          



          
       
    
    }

}


export default resolvers;

   /*  signupDummyUser:(_,{userNew})=>{
        const _id=randomBytes(5).toString("hex")
        users.push({
            _id,
          //  firstName,
           // lastName,
          //  email,
          //  password,
           // quotes
           ...userNew
        })

          return users.find(user=>user._id==_id)*/