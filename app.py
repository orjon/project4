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

projects_schema = ProjectSchema(many=True)

# @app.route('/')
# def home():
#     return 'Project4 is live!', 200

@app.route('/projects', methods=['GET'])
def index():
    projects = Project.query.all()
    return projects_schema.jsonify(projects), 200
