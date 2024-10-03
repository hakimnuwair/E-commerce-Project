import { useState } from 'react'
import React from 'react'
import ShippingAddress from './ShippingAddress'


export default function AddressProcess({addressLoading, address, AddressSummary, handleSetAddress,handleProcessNo, handleOrderSummary, editAddress, handleEditAddress}) {
  

  return (
    <>
    {addressLoading ? (<p>loading...</p>) : (address != null && editAddress === null) ? (<AddressSummary  addressData={address} handleProcessNo={handleProcessNo} handleEditAddress={handleEditAddress}/>) :
          (<>
              <div className="delivery-address">
              <div className="order-header-color">
                <div className="order-headers">
                  <div className="">2</div>
                  <div className="">SHIPPING ADDRESS</div>
                </div>
              </div>
              <div className="address-form">
                <ShippingAddress handleSetAddress={handleSetAddress} handleEditAddress={handleEditAddress} editAddress={editAddress} handleProcessNo={handleProcessNo} handleOrderSummary={handleOrderSummary} />
              </div>
            </div>
          </>)
          }
    </>
  )
}
