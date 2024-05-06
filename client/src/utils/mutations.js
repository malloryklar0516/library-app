import {gql} from "@apollo/client"

export const ADD_USER = gql`
mutation AddUser($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
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
  }
`

export const LOGIN = gql`
mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        password
        booksRead {
          _id
          bookName
          bookAuthor
          reaction
          username
        }
      }
    }
  }
`

export const ADDBOOK = gql`
mutation AddBook($userid: ID, $bookName: String, $bookAuthor: String, $reaction: String) {
    addBook(userid: $userid, bookName: $bookName, bookAuthor: $bookAuthor, reaction: $reaction) {
      _id
      bookName
      bookAuthor
      reaction
      username
    }
  }
  `
