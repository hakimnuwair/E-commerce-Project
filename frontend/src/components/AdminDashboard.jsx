import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Upload from './Upload'
import "../styles/AdminDashboard.css"
import ProductList from './ProductList';
import Summary from './Summary';
import AddProductVariantForm from './AddVariant';
import Nav from './Nav';
import { AuthCheckCtx } from '../shop/AuthCheckCtx';
import UsersList from './UsersList';
import AddDiscount from './AddDiscount';
import CategoryList from './CategoryList';
import DiscountList from './DiscountList';
import SearchNav from './SearchNav';
import AdminNav from './AdminNav';
import OrdersList from './OrdersList';

export default function AdminDashboard() {
    const [authorized, setAuthorized] = useState('');
    const [selectedNav, setSelectedNav] = useState('Upload');
    const [isActive, setIsActive] = useState(false);
    const [navOptionFlag, setNavOptionFlag] = useState(null);


    const handleNav = (selected) => {
        setNavOptionFlag(Date.now());
        setSelectedNav(selected);
    }
    const handleMenuClick = () => {
        setIsActive(prevState => !prevState);
    }

    useEffect(()=>{
        setIsActive(false);
    },[navOptionFlag])

  return (
    <>
    <AdminNav handleMenuClick={handleMenuClick}/>
    <div className='admin-dashboard-section'>
        <div className='admin-dashboard-grid'>
            <SideBar handleMenuClick={handleMenuClick} handleNav={handleNav} isActive={isActive}/>
            <div className='admin-main-section'>
                <div className='admin-main-content'>
            {/* <AddProductVariantForm /> */}
            {
                selectedNav === 'Upload' ?
                <Upload /> :
                selectedNav === 'Products' ?
                <ProductList /> :
                selectedNav === 'Users' ?
                <UsersList /> : 
                selectedNav === 'discount' ?
                <DiscountList /> : 
                selectedNav === 'CategoryList' ?
                <CategoryList /> : 
                selectedNav === 'orders' ?
                <OrdersList /> : null
            }
            </div>
            </div>
        </div>
        
    </div>
    </>
  )
}
