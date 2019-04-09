from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost:5432/project_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
mllo = Marshmallow(app)

# pylint: disable=C0413
from models.project import Project, ProjectSchema

project_schema = ProjectSchema()

# @app.route('/')
# def home():
#     return 'Project4 is live!', 200

@app.route('/projects', methods=['GET'])
def index():
    projects = Project.query.all()
    return project_schema.jsonify(projects, many=True), 200

@app.route('/projects/<int:project_id>', methods=['GET'])
def show(project_id):
    project = Project.query.get(project_id)
    return project_schema.jsonify(project), 200
