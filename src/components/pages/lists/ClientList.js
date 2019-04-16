import React from 'react'
import { Link } from 'react-router-dom'

const ClientList = (props) => {
  const client = props.client

  const  comparator=props.comparator



  return (
    <div className = 'tableRow' >
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>{client.name}</div>
        <div className = 'cellCurrency'></div>
        <div className = 'cellCode'>
          {client.projects && client.projects.map(project => (
            <Link to={`/project/${project.id}`} key={project.id} className="cell">
              <div>{project.code}</div>
            </Link>
          ))}
        </div>

        <div className = 'cellQuarter'>
          {client.projects && client.projects.map(project => (
            <Link to={`/project/${project.id}`} key={project.id} className='cell'>
              <div>{project.name}</div>
            </Link>
          ))}
        </div>
        <div className = 'cellQuarterRight'></div>
        <div className='cellComparator'></div>
        <div className = 'cellCodeRight'></div>
        <div className = 'cellCurrency'></div>
      </div>
    </div>


  )
}

export default ClientList
