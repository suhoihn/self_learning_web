import React, { useState } from 'react'
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Main from './view/Pages/Main'
import Bookmark from './view/Pages/Review/Bookmark';
import History from './view/Pages/Review/History';
import TestPage from './view/Pages/TestPage'

import Layout from './view/Layout/Layout'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/Main" element={<Main />}/>
                        <Route path="/Review" element={<Navigate replace to="/Review/Bookmark"/>}/>
                        <Route exact path="/Review/Bookmark" element={<Bookmark />}/>
                        <Route exact path="/Review/History" element={<History />}/>
                        <Route exact path="/Reference" element={<TestPage/>}/>
                        <Route exact path="/Recommended" element={<TestPage />}/>
                        <Route path="/" element={<Navigate replace to="/Main"/>}/>
                    </Routes>                    
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}
  
export default App;