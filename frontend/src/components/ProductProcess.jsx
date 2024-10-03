import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BuyProduct from './BuyProduct'
import ProductsConfirm from './ProductsConfirm'

export default function ProductProcess({ productLoading, product, handleDecrease, handleIncrease, handleRemove, handleProcessNo, productsConfirm, handleOrderSummary}) {

  return (
    <>
    {productsConfirm === false ? (<>
              <div className="order-summary">
              <div className="order-header-color">
                <div className="order-headers">
                  <div className="">3</div>
                  <div className="">ORDER SUMMARY</div>
                </div>
              </div>
              {
                productLoading === true ? (
                  <p>loading product...</p>
                ) :(product.length === 0 ? (<p style={{padding: "1.2rem 2.4rem"}}>No product in order <Link to="/"><span>EXPLORE PRODUCTS</span></Link></p>  ) : (
                  product.map((product, index) => (
                    <BuyProduct
                      key={product.product.productId}
                      product={product}
                      handleDecrease={handleDecrease}
                      handleIncrease={handleIncrease}
                      handleRemove={handleRemove}
                    />
                  ))
                ))
              }
              {product && product.length >0 ?(<div className="text-end" style={{padding : "1.2rem 2.4rem 1.2rem 2.4rem"}}><button className="btn btn-primary text-end" onClick={() => handleOrderSummary(true)}>Continue</button></div>) : null}
            </div>
            </>) : (<ProductsConfirm product={product} handleOrderSummary={handleOrderSummary} handleProcessNo={handleProcessNo} />)
            }
    </>
  )
}
