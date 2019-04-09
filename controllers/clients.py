from flask import Blueprint, request, jsonify
from models.client import Client, ClientSchema

client_schema = ClientSchema()

api = Blueprint('clients', __name__)

# @app.route('/')
# def home():
#     return 'Project4 is live!', 200

@api.route('/clients', methods=['GET'])
def index():
    clients = Client.query.all()
    return client_schema.jsonify(clients, many=True), 200 #OK

# @api.route('/clients/<int:client_id>', methods=['GET'])
# def show(client_id):
#     project = Client.query.get(client_id)
#     return client_schema.jsonify(project), 200 #OK
#
# @api.route('/clients', methods=['POST'])
# def create():
#     project, errors = client_schema.load(request.get_json())
#     if errors:
#         return jsonify(errors), 422 #Unprocessable Entity
#     project.save()
#     return client_schema.jsonify(project), 201 #Created
#
# @api.route('/clients/<int:client_id>', methods=['PUT'])
# def update(client_id):
#     project = Client.query.get(client_id)
#     project, errors = client_schema.load(request.get_json(), instance=client, partial=True)
#     if errors:
#         return jsonify(errors), 422 #Unprocessable Entity
#     project.save()
#     return client_schema.jsonify(project), 202 #Accepted
#
#
# @api.route('/clients/<int:client_id>', methods=['DELETE'])
# def delete(client_id):
#     project = Client.query.get(client_id)
#     project.remove()
#     return '', 204 #No Content
