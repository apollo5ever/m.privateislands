import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './components/about'
import Post from './components/post';
import {LoginProvider} from './LoginContext'
import Feed from './components/feed'


ReactDOM.render(
  
  <LoginProvider>
  <BrowserRouter>
  <Routes className="main">
    <Route path="/" element={<App/>}>
      <Route path="/about" element={<About/>}/>
      
      <Route path="/island/:island/:tier/:postindex" element={<Post/>}/>
     
      <Route path="about" element={<About />}/>
     
      <Route path="/feed" element={<Feed/>}/>
    </Route>
  </Routes>
  
</BrowserRouter>
</LoginProvider>

  , document.getElementById('root'));

