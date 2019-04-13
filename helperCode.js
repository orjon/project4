<div className={`always ${isOverdue(loan) ? 'yes' : 'no'}`}>


const amountDecimal = ((expense.amount % 1).toFixed(2))*100
console.log(amountDecimal)
const amountWhole = Math.floor(expense.amount)
console.log(amountWhole)

£ {amountWhole}.<span className = 'decimal'>{amountDecimal}</span>

£&thinsp;{sterling.toFixed(2)}
