import React from 'react'
import "../styles/Reviews.css"

export default function 
() {
  return (
    <div className='reviews-section'>
        <h4>REVIEWS</h4>
        <div className='reviews-container'>
            <div className='reviews-given-container'>
                <p>there are no reviews yet</p>
            </div>
            <form className='reviews-form-container' action="">
                <div className='input-container-reviews'>
                <label htmlFor="">Your Review</label>
                <textarea name="" id=""></textarea>
                </div>
                <div className='input-container-reviews'>
                <label htmlFor="">Your Name</label>
                <input type="text" />
                </div>
                <div className='input-container-reviews'>
                <label htmlFor="">Your Email</label>
                <input type="text" />
                </div>
                <button className='review-btn btn btn-primary'>Submit</button>
            </form>
        </div>

    </div>
  )
}
