import { useMutation } from '@apollo/client';
import { ADDBOOK } from '../utils/mutations';
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateList = () => {
  const [formState, setFormState] = useState({
    bookName: '',
    bookAuthor: '',
    reaction: '',
  });

  const [addBook, { error }] = useMutation(ADDBOOK, {
    update(cache, { data: { addBook } }) {
      cache.modify({
        fields: {
          me(existingBooks = []) {
            return {
              ...existingBooks,
              booksRead: [...existingBooks.booksRead, addBook]
            };
          }
        }
      });
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBook({
        variables: { ...formState },
      });

      const newBook = data.addBook;

      console.log('Add book to your library!', newBook);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="bookName">
        <Form.Label>Book Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          name="bookName"
          value={formState.bookName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="bookAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="bookAuthor"
          value={formState.bookAuthor}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="reaction">
        <Form.Label>Reaction</Form.Label>
        <Form.Control
          type="text"
          name="reaction"
          value={formState.reaction}
          onChange={handleChange}
        />
      </Form.Group>
      <Button size="lg" type="submit" style={{ cursor: 'pointer' }}>
        Add
      </Button>
    </Form>
  );
};

export default UpdateList;