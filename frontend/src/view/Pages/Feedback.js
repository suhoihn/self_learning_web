import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

export default function Feedback () {
  const [value, setValue] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate("/Feedback");
  },[]);

  const submit = async () => {
    const username = localStorage.getItem("username");
    await axios.post(
      //"https://suhoihn-backend-e4140594264a.herokuapp.com/api/auth/login",
      "http://localhost:3001/api/auth/sendEmail",
      { username, content: value },
      { headers: {'content-type': 'application/json',} },
    );
    setEmailSent(true);
  }

  return (
    <>
      { emailSent ? 
      <div>
        <h1>Thank you for your feedback!</h1>
      </div>:<div>
        <h1>Feedback</h1>
        <h5>Hi! This is Suho Ihn in Y13 (2024), Please leave your feedback here to help me!</h5>
        <p style={{color: "white"}}>By the way, did you know there is one secret page that was scrapped? I would have "recommended" finding it!</p>
        <TextArea rows={6} onChange={(e) => {setValue(e.target.value)}}/>
        <Button onClick={submit}>Submit</Button>
      </div> }
    </>
    );
};