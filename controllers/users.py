from flask import Blueprint, jsonify, request, g
from models.user import User, UserSchema
from lib.helpers import is_unique
from lib.secure_route import secure_route

api = Blueprint('users', __name__)
user_schema = UserSchema()


@api.route('/user', methods=['GET'])
@secure_route
def user():
    return user_schema.jsonify(g.current_user), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    this_user = User.query.get(user_id)
    return user_schema.jsonify(this_user), 200

@api.route('/users', methods=['GET'])
def user_index():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200 #OK
