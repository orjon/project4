import React from 'react'
import { Link } from 'react-router-dom'


class ClientSummaryList extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {

      client: props.client
    }
  }




  render (){

    const client = this.state.client

    return (
      <div className = 'tableRow' >
        <div className = 'rowCentre'>
          <div className = 'cellQuarter'>{client.name}</div>

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


          <div className = 'cellQuarterRight'>expenses</div>



          <div className = 'cellCurrency'>njk</div>


          <div className='cellComparator'>
            <div className='lineItem summary'>
              <div>&#32;</div>
            </div>
          </div>


          <div className = 'cellCodeRight'>invoices</div>


          <div className = 'cellCurrency'>jkljlkjlk</div>


        </div>
      </div>

    )
  }
}

export default ClientSummaryList
