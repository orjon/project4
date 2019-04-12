from flask import Blueprint, request, jsonify, g
from models.project import Project, ProjectSchema
from models.client import Client
from lib.secure_route import secure_route

project_schema = ProjectSchema()

api = Blueprint('projects', __name__)

# @app.route('/')
# def home():
#     return 'Project4 is live!', 200

@api.route('/projects', methods=['GET'])

def index():
    projects = Project.query.all()
    return project_schema.jsonify(projects, many=True), 200 #OK

@api.route('/project/<int:project_id>', methods=['GET'])
@secure_route
def show(project_id):
    project = Project.query.get(project_id)
    return project_schema.jsonify(project), 200 #OK


@api.route('/projects', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    project, errors = project_schema.load(data)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    client = Client.query.get(data['client_id'])
    project.client = client

    project.user = g.current_user

    project.save()
    return project_schema.jsonify(project), 201 #Created


@api.route('/projects/<int:project_id>', methods=['PUT'])

def update(project_id):
    data = request.get_json()
    project = Project.query.get(project_id)
    project, errors = project_schema.load(data, instance=project, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    client = Client.query.get(data['client_id'])
    project.client = client

    if project.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    project.save()
    return project_schema.jsonify(project), 202 #Accepted


@api.route('/projects/<int:project_id>', methods=['DELETE'])

def delete(project_id):
    project = Project.query.get(project_id)
    project.remove()
    return '', 204 #No Content
