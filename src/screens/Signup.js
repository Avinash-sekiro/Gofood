import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [credential, setCredential] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:5000/api/signup', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
      });

      if (!response.ok) {
        throw new Error('Signup failed'); 
      }

      const data = await response.json();
      console.log('Signup successful:', data);
     
    } catch (error) {
      console.error('Signup error:', error); 
    }
  };

  return (
    <div className='ss'>
<div className='container'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='name' value={credential.name} onChange={handleChange}/>
      </Form.Group>
     
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={credential.email} onChange={handleChange}/>
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name='password' value={credential.password} onChange={handleChange}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Link to="\login" className='m-3 btn btn-danger'>Login</Link>
    </Form>
    </div>
    </div>
  );
}

export default Signup;