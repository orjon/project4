from flask import Blueprint, request, jsonify, g
from models.expense import Expense, ExpenseSchema
from models.project import Project
from models.supplier import Supplier
from lib.secure_route import secure_route

expense_schema = ExpenseSchema()

api = Blueprint('expenses', __name__)

@api.route('/expenses', methods=['GET'])
def index():
    expenses = Expense.query.all()
    return expense_schema.jsonify(expenses, many=True), 200 #OK

@api.route('/expenses/<int:expense_id>', methods=['GET'])
@secure_route
def show(expense_id):
    expense = Expense.query.get(expense_id)
    return expense_schema.jsonify(expense), 200 #OK

@api.route('/expenses', methods=['POST'])
@secure_route
def create():
    data = request.get_json()

    expense, errors = expense_schema.load(data)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

    project = Project.query.get(data['project_id'])
    expense.project = project

    supplier = Supplier.query.get(data['supplier_id'])
    expense.supplier = supplier

    expense.user = g.current_user

    expense.save()
    return expense_schema.jsonify(expense), 201 #Created

@api.route('/expenses/<int:expense_id>', methods=['PUT'])
def update(expense_id):
    data = request.get_json()
    expense = Expense.query.get(expense_id)
    expense, errors = expense_schema.load(data, instance=expense, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity

# --------These must be sent to work --------------------
    project = Project.query.get(data['project_id'])
    expense.project = project

    supplier = Supplier.query.get(data['supplier_id'])
    expense.supplier = supplier
# --------These must be sent to work --------------------

    expense.save()
    return expense_schema.jsonify(expense), 202 #Accepted

@api.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete(expense_id):
    expense = Expense.query.get(expense_id)
    expense.remove()
    return '', 204 #No Content
