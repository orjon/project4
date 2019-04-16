import os
from app import app
from controllers import projects, clients, invoices, expenses, suppliers, auth, users

app.register_blueprint(projects.api, url_prefix='/api')
app.register_blueprint(clients.api, url_prefix='/api')
app.register_blueprint(invoices.api, url_prefix='/api')
app.register_blueprint(expenses.api, url_prefix='/api')
app.register_blueprint(suppliers.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):

    if os.path.isfile('dist/' + path):
        return app.send_static_file(path)

    return app.send_static_file('index.html')
