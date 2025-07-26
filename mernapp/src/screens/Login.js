import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Add this if your backend uses cookies or sessions:
        // credentials: 'include',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Please enter valid credentials");
      } else {
        localStorage.setItem("userEmail",credentials.email);
       localStorage.setItem("authToken",json.authToken);
       console.log(localStorage.getItem("authToken"))
        navigate("/");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className="m-3 btn btn-danger">I'm a new user</Link>
      </form>
    </div>
  );
}
