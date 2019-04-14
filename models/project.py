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
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', backref='projects')

class ProjectSchema(mllo.ModelSchema):

    user = fields.Nested('UserSchema', only=('id', 'username'))

    client = fields.Nested('ClientSchema', only=('id', 'name'))
    invoices = fields.Nested('InvoiceSchema', many=True, only=('id', 'number', 'amount', 'date_paid', 'date_issued', 'date_due', 'description'))
    expenses = fields.Nested('ExpenseSchema', many=True, only=('id', 'description', 'amount', 'date', 'supplier.name'))
    class Meta:
        model = Project
        exclude = ('created', 'updated')
