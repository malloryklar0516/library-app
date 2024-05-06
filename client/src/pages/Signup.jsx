import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Form from "react-bootstrap/Form";
import Button from '@mui/material/Button';
import Auth from '../utils/auth';
import { Link } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (

          <div className="Signup">
            {data ? (<p> Success you may now navigate to {' '} <Link to="/Home">the homepage</Link> </p>
                  ) : (
                    <Form onSubmit={handleFormSubmit}>
                    <Form.Group size="lg" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        autoFocus
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="username">
                   <Form.Label>Username</Form.Label>
                   <Form.Control 
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                    </Form.Group>
                    <Button variant="contained" type="submit" >
                      Sign Up
                    </Button>
                  </Form>
                  )}
                  {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
                </div>)

};

export default Signup;
