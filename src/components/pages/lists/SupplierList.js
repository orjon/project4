import React from 'react'

const SupplierList = (props) => {
  const supplier = props.supplier

  return (
    <div className = 'tableRow' >
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>{supplier.name}</div>
      </div>
    </div>
  )
}

export default SupplierList
