import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import "./style.css"
import { useNavigate } from 'react-router-dom';

function Log() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential) // Concise body payload
      });

      if (!response.ok) {
        throw new Error('Login failed'); // Handle errors gracefully
      }

      const data = await response.json();

      if (!data.success) {
        alert('Invalid email or password. Please try again.');
      } else {
        localStorage.setItem('authToken', data.authToken);
        navigate('/'); // Redirect to homepage after successful login
      }
    } catch (error) {
      console.error(error); // Log errors for debugging
      // Optionally display a user-friendly error message
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className='ss'>
      <div>
        <Form className='kl' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name='email'
              value={credential.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name='password'
              value={credential.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Log;