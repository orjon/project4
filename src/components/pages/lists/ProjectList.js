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
              <Link to={`/expenses/${expense.id}`} className='cell'>
                {expense.description}
              </Link>
            </div>
          ))}
        </div>
        <div className='cellCurrency'>
          {project.expenses && project.expenses.map(expense => (
            <div key={expense.id} className="lineItem">
              <Link to={`/expenses/${expense.id}`} className='cell'>
                £&thinsp;{expense.amount.toFixed(2)}
              </Link>
            </div>
          ))}

        </div>
        <div className='cellComparator'>
          <div className='lineItem summary'>
            <div>&#32;</div>
          </div>
        </div>
        <div className='cellCodeRight'>
          {project.invoices && project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">
              <Link to={`/invoice/${invoice.id}`} className='cell'>
                {invoice.number}
              </Link>
            </div>
          ))}
        </div>
        <div className='cellCurrency'>
          {project.invoices && project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">
              <Link to={`/invoice/${invoice.id}`} className='cell'>
                £&thinsp;{invoice.amount.toFixed(2)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}





export default ProjectList
