import {ApolloServer,gql } from "apollo-server-express"
import {ApolloServerPluginLandingPageGraphQLPlayground,ApolloServerPluginDrainHttpServer,ApolloServerPluginLandingPageDisabled} from 'apollo-server-core'
import {quotes,users} from "./fakedb.js"

import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken'
import typeDefs from "./schema.js"


import mongoose from "mongoose"

import dotenv from 'dotenv'

import path, {dirname } from "path";
const port = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);
const __dirname=path.resolve();

if(process.env.NODE_ENV!=="production")
{dotenv.config()}

//import { JWT_SECRET, MONGO_URI } from "./config.js"




mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("...Connected")
})
mongoose.connection.on("error",(err)=>{
    console.log("...Error in Connection",err)
})


import './models/User.js'
import './models/Quotes.js'

import resolvers from "./resolvers.js"




const context =({req})=>{

    const {authorization}=req.headers
    if(authorization)
    {
       const {userId}= jwt.verify(authorization,process.env.JWT_SECRET)
       return {userId}
    }


}



const server=new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !=="production"? ApolloServerPluginLandingPageGraphQLPlayground():ApolloServerPluginLandingPageDisabled()
    ]
})


if(process.env.NODE_ENV=="production"){
    app.use(express.static('myclient/build'));
    //const path= require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'myclient','build','index.html'));
    })
}



await server.start();
  server.applyMiddleware({ app ,
path:'/graphql' });
  httpServer.listen({ port: port },()=>
  {
      console.log(`hi mumbai at${server.graphqlPath}`);
  })

