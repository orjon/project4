from app import app
from controllers import projects, clients, invoices, expenses, suppliers

app.register_blueprint(projects.api, url_prefix='/api')
app.register_blueprint(clients.api, url_prefix='/api')
app.register_blueprint(invoices.api, url_prefix='/api')
app.register_blueprint(expenses.api, url_prefix='/api')
app.register_blueprint(suppliers.api, url_prefix='/api')
