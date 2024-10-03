import React from 'react'
import classes from "../styles/AddressEnabled.module.css"

export default function Enabled({srNo, heading}) {
  return (
    <>
    <div className={classes.section}>
      <div className={classes.headerContainer}>
          <div className={classes.srNo}>{srNo}</div>
          <div className={classes.heading}>{heading}</div>
      </div>
    </div>
    </>
  )
}
