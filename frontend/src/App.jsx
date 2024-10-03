import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Featured from './components/Featured.jsx';
import Category from './components/CategoryGallery.jsx';
import About from './components/About.jsx';
import axios from 'axios';
import Watches from './components/Watches.jsx';
import Goggles from './components/Goggles.jsx';
import Perfumes from './components/Perfumes.jsx';
import BodySprays from './components/Bodysparys.jsx';
import CategoryProduct from './components/CategoryProduct.jsx';
import Categories from './components/Categories.jsx';
import Discounts from './components/Discounts.jsx';
import AboutUs from "./components/AboutsUs.jsx"
import ContactUs from './components/ContactUs.jsx';

function App() {
  return (   
        <>
          <Categories />
          <Discounts />
          <Featured />
         </>
  );
}


export default App;
