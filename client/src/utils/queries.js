import {gql} from "@apollo/client"

export const ME = gql`
query Me {
    me {
      _id
      username
      password
      booksRead {
        _id
        bookName
        bookAuthor
        reaction
      }
    }
  }
`

export const BOOKBYID = gql`
query BookbyID($id: ID) {
    bookbyID(_id: $id) {
      _id
      bookName
      bookAuthor
      reaction
    }
  }`

  export const ALLBOOKS = gql`
  query Books {
    books {
      _id
      bookName
      bookAuthor
      reaction
      username
    }
  }
  `

