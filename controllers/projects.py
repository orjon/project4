from flask import Blueprint, request, jsonify
from models.project import Project, ProjectSchema

project_schema = ProjectSchema()

api = Blueprint('projects', __name__)

# @app.route('/')
# def home():
#     return 'Project4 is live!', 200

@api.route('/projects', methods=['GET'])
def index():
    projects = Project.query.all()
    return project_schema.jsonify(projects, many=True), 200

@api.route('/projects/<int:project_id>', methods=['GET'])
def show(project_id):
    project = Project.query.get(project_id)
    return project_schema.jsonify(project), 200

@api.route('/projects', methods=['POST'])
def create():
    project, errors = project_schema.load(request.get_json())
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    project.save()
    return project_schema.jsonify(project), 201
