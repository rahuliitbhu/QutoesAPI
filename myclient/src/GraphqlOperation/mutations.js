import {gql} from '@apollo/client'
export const SIGNUP_USERS =gql`

mutation creatUser($userNew:userInput!){
    user:signupUser(userNew:$userNew)
    {
      
      firstName
     
    
    }
  }


`

export const LOGIN_USER =gql`

mutation SigninUser($userSignin:userSigninInput!){
  user:signinUser(userSignin:$userSignin)
  {
    token
  
  }
}


`

export const CREATE_QUOTE =gql`


mutation CreateQuotes($value:String!){  Quote:createQuote(value:$value)

}


`


export const DELETE_QUOTE=gql`

mutation DeleteQuote($_id:ID!){
  del:deleteQuote(_id:$_id)
} 
`