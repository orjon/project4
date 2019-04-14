import React from 'react'

const ProjectHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellCode'>code</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>project</div>
        <div className = 'cellQuarter'>client</div>
        <div className = 'cellQuarterRight'>expenses</div>
        <div className = 'cellCurrency'>amount</div>
        <div className = 'cellCodeRight'>invoices</div>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default ProjectHeader
