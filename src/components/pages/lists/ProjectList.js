import React from 'react'

const ProjectList = (props) => {
  const project = props.project

  return (
    <div className= 'tableRow' >
      <div className='rowCentre'>
        <div className='cellDate'>{project.code}</div>
        <div className='cellTemp'>{project.name}</div>
        <div className='cellTemp'>{project.client.name}</div>
        <div className='cellTemp'>
          {project.invoices && project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">
              <div>{invoice.number}</div>
            </div>
          ))}
        </div>
        <div className='cellTemp'>
          {project.invoices && project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">
              <div>£&thinsp;{invoice.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className='cellTemp'>
          {project.expenses && project.expenses.map(expense => (
            <div key={expense.id} className="lineItem">
              <div>{expense.description}</div>
            </div>
          ))}
        </div>
        <div className='cellTemp'>
          {project.expenses && project.expenses.map(expense => (
            <div key={expense.id} className="lineItem">
              <div>£&thinsp;{expense.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}





export default ProjectList
// {project.invoices && project.invoices.map(invoice => (
//   <span key={invoice.id} className="lineItem">{invoice.number} </span>
// ))}

        //
        // <div className="container">
        //   {this.state.projects && this.state.projects.map(project => (
        //     <Link to={`/project/${project.id}`} key={project.id} className="lineItem">
        //       <div >{project.id} : {project.code} : {project.name} : {project.client.name} : {project.invoices.id}</div>
        //     </Link>
        //   ))}
        // </div>



              // <div >{project.id} : {project.code} : {project.name} : {project.client.name} : {project.invoices.id}</div>





// <div className= 'tableRow' >
//   <div className= 'rowLeft'>
//     <div className= 'cellDate'>{project.date}</div>
//   </div>
//   <div className='rowCentre'>
//     <div className='cellStringShort'>{project.project.name}</div>
//     <div className='cellStringShort'>{project.supplier.name}</div>
//     <div className= 'cellStringLong'>{project.description}</div>
//   </div>
//   <div className = 'rowRight'>
//     <div className = 'cellCurrency'>{project.amount.toFixed(2)} £</div>
//   </div>
// </div>
