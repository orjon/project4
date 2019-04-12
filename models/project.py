from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.client import Client
from models.user import User, UserSchema

class Project(db.Model, BaseModel):

    __tablename__ = 'projects'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='projects')

    code = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    # location_lat = db.Column(db.Integer)
    # location_lng = db.Column(db.Integer)
    # date_start = db.Column()
    # date_end = db.Column()
    # budget = db.Column()
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', backref='projects')

class ProjectSchema(mllo.ModelSchema):

    user = fields.Nested('UserSchema', only=('id', 'username'))

    client = fields.Nested('ClientSchema', only=('id', 'name'))
    invoices = fields.Nested('InvoiceSchema', many=True, only=('id', 'number', 'amount', 'description'))
    expenses = fields.Nested('ExpenseSchema', many=True, only=('id', 'description', 'amount', 'supplier.name'))
    class Meta:
        model = Project
        exclude = ('created', 'updated')
