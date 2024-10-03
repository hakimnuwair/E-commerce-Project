import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import AboutUsNav from './AboutUsNav'

export default function AboutUsLayout() {
  return (
    <>
    <AboutUsNav />
    <Outlet />
    <Footer />
    </>
  )
}
