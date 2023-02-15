import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import MainBody from './components/MainBody';

const App = () => {
    return (
            <BrowserRouter>
                <Header />
                <MainBody />
            </BrowserRouter>
    )
}

export default App