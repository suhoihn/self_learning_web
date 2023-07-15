import React, { useState } from 'react'
import store from "./store"
import { Provider } from "react-redux"
import Example from "./Example"

function App() {
    return (
        <Provider store={store}>
            <Example/>
        </Provider>
    );
}
  
export default App;