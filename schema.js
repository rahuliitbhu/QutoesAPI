
import {gql} from "apollo-server-express"
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'

const typeDefs = gql`
type Query{

greet:String
users:[User]
user(_id:ID!):User
quotes:[QuotewithName]
iquote(by:ID!):[Quote]
myProfile:User

}

type QuotewithName{
    value:String!
    by:IdandName
}
type IdandName{
    _id:String!
    firstName:String!
}
type User{
    _id:ID!
    firstName:String!
    lastName:String!
    email:String!
    password:String!
    quotes:[Quote]
}
type Quote{
    _id:ID!
    value:String!
    by:ID!
}

type Token{
    token:String
}


type Mutation{
    signupUser( userNew:userInput!): User
    signinUser( userSignin:userSigninInput!):Token
    createQuote(value:String!):String
    deleteAccount:String
    deleteQuote(_id:ID!):String
   

}


input userInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input userSigninInput{
    
    email:String!
    password:String!
}


`

export default typeDefs;