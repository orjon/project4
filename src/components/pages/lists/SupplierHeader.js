import React from 'react'

const SupplierHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>supplier</div>
        <div className = 'cellQuarter'>client</div>
        <div className = 'cellCode'>no.</div>
        <div className = 'cellQuarter'>project</div>
        <div className = 'cellQuarter'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default SupplierHeader
