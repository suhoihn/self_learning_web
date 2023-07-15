import React, { useState } from 'react'

import { Button, Space } from 'antd';
import { Actions as exampleActions } from "./store/actions/exampleActions"
import { useDispatch, useSelector } from "react-redux";

export default function Example() {
    const [id, setId] = useState("");
    const email = useSelector((state) => {
        let email = state.example.data;
        return email;
    });

    const dispatch = useDispatch()
  
    const handleOnSubmit = (id) => {
        console.log("UI: name =", id)
      dispatch(exampleActions.getData(id))
    }
    return (
        <>
            <h1>This is React WebApp </h1>
            <form action="">
            <input type="text" placeholder="name" 
                    value={id} onChange={(e) => setId(e.target.value)} />
            </form>
            <Button onClick={handleOnSubmit(id)} type="primary">action dispatch</Button>
            <p>{email}</p>
        </>
    )
}