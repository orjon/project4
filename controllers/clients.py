from flask import Blueprint, request, jsonify, g
from models.client import Client, ClientSchema
from lib.secure_route import secure_route

client_schema = ClientSchema()

api = Blueprint('clients', __name__)

@api.route('/clients', methods=['GET'])
@secure_route
def index():
    clients = Client.query.all()
    return client_schema.jsonify(clients, many=True), 200 #OK

@api.route('/clients/<int:client_id>', methods=['GET'])
@secure_route
def show(client_id):
    client = Client.query.get(client_id)
    return client_schema.jsonify(client), 200 #OK

@api.route('/clients', methods=['POST'])
@secure_route
def create():
    client, errors = client_schema.load(request.get_json())
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    client.user = g.current_user

    client.save()
    return client_schema.jsonify(client), 201 #Created

@api.route('/clients/<int:client_id>', methods=['PUT'])
@secure_route
def update(client_id):
    client = Client.query.get(client_id)
    client, errors = client_schema.load(request.get_json(), instance=client, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    client.save()
    return client_schema.jsonify(client), 202 #Accepted

@api.route('/clients/<int:client_id>', methods=['DELETE'])
@secure_route
def delete(client_id):
    client = Client.query.get(client_id)
    client.remove()
    return '', 204 #No Content
