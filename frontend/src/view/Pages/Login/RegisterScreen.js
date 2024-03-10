import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import "./css/vendor/bootstrap/css/bootstrap.min.css"
import "./css/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./css/vendor/animate/animate.css"
import "./css/vendor/css-hamburgers/hamburgers.min.css"
import "./css/vendor/select2/select2.min.css"
import "./css/css/util.css"
import "./css/css/main.css"


const RegisterScreen = ({ history }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [history]);

  const registerHandler = async (e) => {
    console.log("Let's register!");

    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      const { data } = await axios.post(
        //"https://suhoihn-backend-e4140594264a.herokuapp.com/api/auth/register",
        "http://localhost:3001/api/auth/register",
        { username, email, password },
        config
      );
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', email);
      navigate('/');
    } catch (e) {
      console.log("There is an error from backend: ", e);
      // From the returned error object, render the first error text
      setError(e.response.data[0]);
    }
  };
  return (
    <div className="container-login100">
      <div class="wrap-login100">
        <form onSubmit={registerHandler} className="login100-form validate-form">
          <h3 className="login100-form-title">Register</h3>
          {error && <span className="error" style={{color:'red'}}>{error}</span>}
          <div className="wrap-input100 validate-input">
            <input
              class="input100"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>


          </div>
          <div className="wrap-input100 validate-input">
            <input
              class="input100"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>

          </div>
          <div className="wrap-input100 validate-input">
            <input
              class="input100"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>
          <div className="wrap-input100 validate-input">
            <input
              class="input100"
              type="password"
              name="confirm"
              id="confirm"
              placeholder="Enter Password Again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>
          <button type="submit" className="login100-form-btn">
            Register
          </button>
          <span className="txt2">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
