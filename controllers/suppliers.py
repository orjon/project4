from flask import Blueprint, request, jsonify, g
from models.supplier import Supplier, SupplierSchema
from lib.secure_route import secure_route

supplier_schema = SupplierSchema()

api = Blueprint('suppliers', __name__)

@api.route('/suppliers', methods=['GET'])
@secure_route
def index():
    suppliers = Supplier.query.all()
    return supplier_schema.jsonify(suppliers, many=True), 200 #OK

@api.route('/suppliers/<int:supplier_id>', methods=['GET'])
@secure_route
def show(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    return supplier_schema.jsonify(supplier), 200 #OK

@api.route('/suppliers', methods=['POST'])
@secure_route
def create():
    supplier, errors = supplier_schema.load(request.get_json())
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    supplier.user = g.current_user

    supplier.save()
    return supplier_schema.jsonify(supplier), 201 #Created

@api.route('/suppliers/<int:supplier_id>', methods=['PUT'])
@secure_route
def update(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    supplier, errors = supplier_schema.load(request.get_json(), instance=supplier, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    supplier.save()
    return supplier_schema.jsonify(supplier), 202 #Accepted

@api.route('/suppliers/<int:supplier_id>', methods=['DELETE'])
@secure_route
def delete(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    supplier.remove()
    return '', 204 #No Content
