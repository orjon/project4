import React from 'react'

const ProjectHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>code</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>project</div>
        <div className = 'cellQuarter'>client</div>
        <div className = 'cellQuarter'>invoices</div>
        <div className = 'cellDate'>amount</div>
        <div className = 'cellQuarter'>expenses</div>
        <div className = 'cellDate'>amount</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>kkkk</div>
      </div>
    </div>
  )
}

export default ProjectHeader
