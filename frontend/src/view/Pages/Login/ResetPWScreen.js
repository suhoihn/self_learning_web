import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./css/vendor/bootstrap/css/bootstrap.min.css"
import "./css/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./css/vendor/animate/animate.css"
import "./css/vendor/css-hamburgers/hamburgers.min.css"
import "./css/vendor/select2/select2.min.css"
import "./css/css/util.css"
import "./css/css/main.css"
import { Divider } from 'antd';

const ResetPWScreen = ({ history }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const token = useParams();


  const submitNewPW = async (e) => {
    console.log("submit pressed");
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    if(password !== confirmPassword){
      setError("Password mismatch");
      return;
    }

    if(password.length < 6){
      setError("Password is too short; minimum length is 6");
      return;
    }

    try {
      const { data } = await axios.put(
        //"https://suhoihn-backend-e4140594264a.herokuapp.com/api/auth/login",
        "http://localhost:3001/api/auth/passwordreset/" + token.token,
        { password },
        config
      );
      
      console.log("Amazing! Your password changed!");

      localStorage.setItem('authToken', data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem('userEmail', data.email);
      navigate('/');

    } catch (error) {
      console.log("I am Error: ", error);
      setError(error.response.data);
    }
  };
  return (
    <div className="container-login100">
      <div class="wrap-login100">
      <form onSubmit={submitNewPW} className="login-screen__form">
        <h3 className="login100-form-title">Reset Password</h3>
        {error && <span className="error" style={{color:'red'}}>{error}</span>}
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
        <button type="submit" className="login100-form-btn" tabIndex={3}>
          Change
        </button>
      </form>
      </div>
    </div>
  );
};

export default ResetPWScreen;