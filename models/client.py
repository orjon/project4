from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.user import User, UserSchema

class Client(db.Model, BaseModel):
    __tablename__ = 'clients'


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='clients')

    name = db.Column(db.String(40), nullable=False)
    # contact = db.Column(db.Srting)
    # email


class ClientSchema(mllo.ModelSchema, BaseSchema):

    user = fields.Nested('UserSchema', only=('id', 'username'))
    projects = fields.Nested('ProjectSchema', many=True, only=('id', 'name'))
    invoices = fields.Nested('InvoiceSchema', many=True, only=('id', 'number'))
    class Meta:
        model = Client
        exclude = ('created', 'updated')