from app import app
from controllers import projects

app.register_blueprint(projects.api, url_prefix='/api')
