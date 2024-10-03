import React from 'react'
import ProductGallery from './ProductGallery'

export default function MensProducts({onViewProduct}) {
  return (
    <>
    <ProductGallery heading="Mens Products" onViewProduct={onViewProduct}/>
    </>
    
  )
}
