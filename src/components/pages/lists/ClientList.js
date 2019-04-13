import React from 'react'

const ClientList = (props) => {
  const client = props.client

  return (
    <div className = 'tableRow' >
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>{client.name}</div>
      </div>
    </div>
  )
}

export default ClientList
