import {gql} from '@apollo/client'
export const GET_ALL_QUOTES =gql`

query GetAllQuotes{

  quotes{
    value
    by{
      _id
      firstName
    }
 
  }

}


`

export const GET_MY_PROFILE =gql`

query Myprofile{ prof:myProfile{
  
  firstName
  email
  
  quotes{
    _id
    value
    
  }
}

}
`


export const GET_PROFILE_BY_ID =gql`
query getUserbyId($user_id:ID!){
  user(_id:$user_id)
  {
    _id
    firstName
    lastName
    email
    quotes{
      value
      by
    }
  
  }
}
`
