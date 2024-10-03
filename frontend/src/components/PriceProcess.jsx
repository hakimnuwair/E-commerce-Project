import React from 'react'
import PriceDetails from './PriceDetails'
import OrderPriceDetails from './OrderPriceDetails'

export default function PriceProcess({productLoading, product}) {
  return (
    <>
    <div className="order-second-col">
            {productLoading ? (
              <>loading...</>
            ) : (
              <OrderPriceDetails products={product} />
            )}
          </div>
    </>
  )
}
