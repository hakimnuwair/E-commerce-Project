import React from 'react'

export default function MainProductList({displayProduct}) {
  return (
    <div className={classes.mainSectionContainer}>
          <MainSectionGallery heading="Featured Products" redirectTo="watches" products={displayProduct} />
    </div>
  )
}
