import React from 'react'

const InvoiceList = (props) => {
  const invoice = props.invoice
  const today = props.today


  return (
    <div>
      {invoice.date_issued} : {invoice.number} : {invoice.description} ({invoice.client.name}) {invoice.project.name} : {invoice.amount} ({invoice.date_due}
      {invoice.date_paid})
    </div>
  )
}


export default InvoiceList

// dueIn(date) {
//   var x = new moment()
//   var y = new moment()
//   var duration = moment.duration(x.diff(y))
//   console.log(duration)
//
//   const today = moment()
//   const diff = today.diff(moment(date), 'days')// const temp = (this.state.invoices.date_due)
//
//   return diff
// }



// this.state.invoices && this.state.invoices.map(invoice => (
//   <div key={invoice.id} className="lineItem">
//     <div>
//       {invoice.date_issued} : {invoice.number} : {invoice.description} ({invoice.client.name}) {invoice.project.name} : {invoice.amount} ({invoice.date_due}
//       {invoice.date_paid})
//       {this.dueIn(invoice.date_due)}
//     </div>
//   </div>
// ))
