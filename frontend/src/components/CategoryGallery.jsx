import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Category.css";
import img from "../imgs/rick-muigo-SX9IouL_qOg-unsplash.jpg";

export default function CategoryGallery() {
  return (
    <>
      <div className='category-grid'>
        <div 
          className='category-product'
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className='category-container'>
            <h4 className='category-heading'>Watch Collection</h4>
            <Link to="/watches">EXPLORE NOW</Link>
          </div>
        </div>

        <div 
          className='category-product'
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className='category-container'>
            <h4 className='category-heading'>Watch Collection</h4>
            <Link to="/watches">EXPLORE NOW</Link>
          </div>
        </div>

        <div 
          className='category-product'
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className='category-container'>
            <h4 className='category-heading'>Watch Collection</h4>
            <Link to="/watches">EXPLORE NOW</Link>
          </div>
        </div>

        <div 
          className='category-product'
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className='category-container'>
            <h4 className='category-heading'>Watch Collection</h4>
            <Link to="/watches">EXPLORE NOW</Link>
          </div>
        </div>
      </div>
    </>
  );
}
