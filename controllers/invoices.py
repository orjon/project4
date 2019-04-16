from flask import Blueprint, request, jsonify, g
from models.invoice import Invoice, InvoiceSchema
from models.project import Project
from models.client import Client
from lib.secure_route import secure_route

invoice_schema = InvoiceSchema()

api = Blueprint('invoices', __name__)

@api.route('/invoices', methods=['GET'])
@secure_route
def index():
    invoices = Invoice.query.all()
    return invoice_schema.jsonify(invoices, many=True), 200 #OK

@api.route('/invoice/<int:invoice_id>', methods=['GET'])
@secure_route
def show(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    return invoice_schema.jsonify(invoice), 200 #OK

@api.route('/invoices', methods=['POST'])
@secure_route
def create():
    data = request.get_json()

    invoice, errors = invoice_schema.load(data)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    project = Project.query.get(data['project_id'])
    invoice.project = project

    client = Client.query.get(data['client_id'])
    invoice.client = client

    invoice.user = g.current_user

    invoice.save()
    return invoice_schema.jsonify(invoice), 201 #Created

@api.route('/invoices/<int:invoice_id>', methods=['PUT'])
@secure_route
def update(invoice_id):
    data = request.get_json()
    invoice = Invoice.query.get(invoice_id)
    invoice, errors = invoice_schema.load(data, instance=invoice, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    project = Project.query.get(data['project_id'])
    invoice.project = project

    invoice.save()
    return invoice_schema.jsonify(invoice), 202 #Accepted

@api.route('/invoices/<int:invoice_id>', methods=['DELETE'])
@secure_route
def delete(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    invoice.remove()
    return '', 204 #No Content
