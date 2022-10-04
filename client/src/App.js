import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NaveBar from './components/NavBar/NaveBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <NaveBar />
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/auth" element={ <Auth /> } />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
