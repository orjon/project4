import React from 'react'
import { Link } from 'react-router-dom'

const ProjectList = (props) => {
  const project = props.project

  return (
    <div className='tableRow'>
      <div className='rowLeft'>
        <div className='cellCode'>
          <Link to={`/project/${project.id}`} className='cell'>
            {project.code}
          </Link>
        </div>
      </div>
      <div className='rowCentre'>
        <div className='cellQuarter'>
          <Link to={`/project/${project.id}`} className='cell'>
            {project.name}
          </Link>
        </div>
        <div className='cellQuarter'>
          <Link to={`/clients/${project.client.id}`} className='cell'>
            {project.client.name}
          </Link>
        </div>
        <div className='cellQuarterRight'>
          {project.expenses && project.expenses.map(expense => (
            <div key={expense.id} className="lineItem">
              <div>{expense.description}</div>
            </div>
          ))}
        </div>
        <div className='cellCurrency'>
          {project.expenses && project.expenses.map(expense => (
            <div key={expense.id} className="lineItem">
              <div>£&thinsp;{expense.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className='cellCodeRight'>
          {project.invoices && project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">
              <div>{invoice.number}</div>
            </div>
          ))}
        </div>
        <div className='cellCurrency'>
          {project.invoices && project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">
              <div>£&thinsp;{invoice.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}





export default ProjectList
