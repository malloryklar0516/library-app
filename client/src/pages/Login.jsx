import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: ''});
  const [logon, { error, data}] = useMutation(LOGIN);
   // update state based on form input changes
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
      const { data} = await logon({
        variables: {...formState},});
        Auth.login(data.login.token);
      } catch(err) {
        console.error(err);
      }
      //clear form
      setFormState({email:'', password:''});
      
    };
    return (       
   <div className="Login">
    {data ? (
        <Navigate replace to="/Home"/>
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
      <Button variant ="contained" type="submit">
        Login
      </Button>
    </Form>
    )}   {error && (
      <div className="my-3 p-3 bg-danger text-white">
        {error.message}
      </div>
    )}
      </div>
    )}

    
export default Login;