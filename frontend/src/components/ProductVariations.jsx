import React from 'react'
import classes from "../styles/ProductVariations.module.css"

export default function ProductVariations({productVariants}) {
    const products = [{}]
  return (
    <>
    {productVariants.map(variant => (
        <div className={classes.section}>
        <div className={classes.container}>
            <div className={classes.colorContainer}>
            <div className={classes.heading}>{variant.color}</div>
            <div className={classes.imgs}>
                {
                    products.map((product) => (<img src={variant.imageUrl} height="84px" width="70px" />) )
                }
            </div>
            </div>
            {variant.size === null ? null : (
            <div className={classes.sizeContainer}>
                <div className={classes.heading}>size</div>
                    <div className={classes.sizes}>
                        {products.map((product) => (<div className={classes.size}>{variant.size}</div>))}
                    </div>
             </div>
            )} 
        </div>
            
    </div>
    ))}
    </>
  )
}
