import React from 'react'
import PaymentOptions from './PaymentOptions'

export default function PaymentProcess({handleOrderConfirm , product, address}) {
  return (
    <>
    <div className="payment-method">
              <div className="order-header-color">
                <div className="order-headers">
                  <div className="">4</div>
                  <div className="">PAYMENT OPTION</div>
                </div>
              </div>
              <div className="payment-content">
                <PaymentOptions handleOrderConfirm={handleOrderConfirm} product={product} address={address}/>
              </div>
            </div>
    </>
  )
}
