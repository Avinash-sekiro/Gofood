import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation // backend expects "location"
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Please enter valid credentials");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name='name'
            value={credentials.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name='email'
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="addressInput" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name='geolocation'
            value={credentials.geolocation}
            onChange={onChange}
            aria-describedby="locationHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name='password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user?</Link>
      </form>
    </div>
  );
}
