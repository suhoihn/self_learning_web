import React, { useState } from 'react'
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Main from './view/Pages/Main'
import Review from './view/Pages/Review'
import TestPage from './view/Pages/TestPage'

import Layout from './view/Layout/Layout'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/Main" element={<Main />}/>
                        <Route exact path="/Review" element={<Review />}/>
                        <Route exact path="/Reference" element={<TestPage/>}/>
                        <Route exact path="/Recommended" element={<Review />}/>
                        <Route path="/" element={<Navigate replace to="/Main"/>}/>
                    </Routes>                    
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}
  
export default App;