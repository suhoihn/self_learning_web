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
import { Divider } from 'antd';

const LoginScreen = ({ history }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [history]);

  const loginHandler = async (e) => {
    console.log("login pressed");
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        //"https://suhoihn-backend-e4140594264a.herokuapp.com/api/auth/login",
        "http://localhost:3001/api/auth/login",
        { username, password },
        config
      );
      localStorage.setItem('authToken', data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem('userEmail', data.email);
      console.log(data);
      navigate('/');
    } catch (error) {
      console.log("Error: ", error)
      setError(error.response.data);
      // setTimeout(() => {
      //   setError('');
      // }, 5000);
    }
  };
  return (
    <div className="container-login100">
      <div class="wrap-login100">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login100-form-title">Login</h3>
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
            tabIndex={2}
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
        <button type="submit" className="login100-form-btn" tabIndex={3}>
          Login
        </button>
        <span className="txt2">
          Don't have an account? <Link to="/register" tabIndex={5}>Register</Link>
        </span>
        <p></p>
        <span className="txt2">
          Forgot password? <Link to="/findpw" tabIndex={6}>Forgot Password?</Link>
        </span>
      </form>
      </div>
    </div>
  );
};

export default LoginScreen;