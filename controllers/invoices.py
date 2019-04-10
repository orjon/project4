from flask import Blueprint, request, jsonify
from models.invoice import Invoice, InvoiceSchema

invoice_schema = InvoiceSchema()

api = Blueprint('invoices', __name__)

@api.route('/invoices', methods=['GET'])
def index():
    invoices = Invoice.query.all()
    return invoice_schema.jsonify(invoices, many=True), 200 #OK

@api.route('/invoices/<int:invoice_id>', methods=['GET'])
def show(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    return invoice_schema.jsonify(invoice), 200 #OK

@api.route('/invoices', methods=['POST'])
def create():
    invoice, errors = invoice_schema.load(request.get_json())
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    invoice.save()
    return invoice_schema.jsonify(invoice), 201 #Created

@api.route('/invoices/<int:invoice_id>', methods=['PUT'])
def update(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    invoice, errors = invoice_schema.load(request.get_json(), instance=invoice, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    invoice.save()
    return invoice_schema.jsonify(invoice), 202 #Accepted

@api.route('/invoices/<int:invoice_id>', methods=['DELETE'])
def delete(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    invoice.remove()
    return '', 204 #No Content
