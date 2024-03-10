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

const FindPWScreen = ({ history }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sendStatus, setSendStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [history]);

  const findPWHandler = async (e) => {
    console.log("find pw pressed");
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const { u, e, data } = await axios.post(
        //"https://suhoihn-backend-e4140594264a.herokuapp.com/api/auth/login",
        "http://localhost:3001/api/auth/forgotpassword",
        { username, email },
        config
      );
      setSendStatus(true);

    } catch (error) {
      console.log("I am Error: ", error)
      setError(error.response.data);
      // setTimeout(() => {
      //   setError('');
      // }, 5000);
    }
  };
  return (
    sendStatus ? 
    <>
      <div className="container-login100">
        <div class="wrap-login100">
          <h3 className="login100-form-title">Email has been sent!</h3>
          
          
          <b>Please follow the instructions in the email.</b>
          <button onSubmit={findPWHandler} className="login100-form-btn" tabIndex={3}>
            Resend
          </button>
          
        </div>
      </div>
    </> : <>
      <div className="container-login100">
        <div class="wrap-login100">
        <form onSubmit={findPWHandler} className="login-screen__form">
          <h3 className="login100-form-title">Forgot Password?</h3>
          {error && <span className="error" style={{color:'red'}}>{error}</span>}
          <div className="wrap-input100 validate-input">
            <input
              class="input100"
              type="username"
              name="username"
              id="username"
              placeholder="Enter username"
              value={username}
              tabIndex={1}
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
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>
          <button type="submit" className="login100-form-btn" tabIndex={3}>
            Find!
          </button>
          <span className="txt2">
            Don't have an account? <Link to="/register" tabIndex={5}>Register</Link>
          </span>
        </form>
        </div>
      </div>
    </>
  );
};

export default FindPWScreen;