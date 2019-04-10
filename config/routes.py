from app import app
from controllers import projects, clients, invoices

app.register_blueprint(projects.api, url_prefix='/api')
app.register_blueprint(clients.api, url_prefix='/api')
app.register_blueprint(invoices.api, url_prefix='/api')
