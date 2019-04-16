from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.user import User, UserSchema

class Client(db.Model, BaseModel):
    __tablename__ = 'clients'


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='clients')

    name = db.Column(db.String(40), nullable=False)



class ClientSchema(mllo.ModelSchema, BaseSchema):

    user = fields.Nested('UserSchema', only=('id', 'username'))
    projects = fields.Nested('ProjectSchema', many=True, only=('id', 'code', 'name'))
    invoices = fields.Nested('InvoiceSchema', many=True, only=('id', 'number', 'amount'))
    expenses = fields.Nested('ExpenseSchema', many=True, only=('id', 'amount'))
    class Meta:
        model = Client
        exclude = ('created', 'updated')
