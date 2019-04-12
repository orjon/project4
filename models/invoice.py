from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.project import Project
from models.client import Client
from models.user import User, UserSchema


class Invoice(db.Model, BaseModel):

    __tablename__ = 'invoices'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='invoices')

    number = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(100), nullable=False)

    date_issued = db.Column(db.String(10), nullable=False)
    date_due = db.Column(db.String(10), nullable=False)
    date_paid = db.Column(db.String(10))
    # pdf_link = db.Column(db.Text)
    amount = db.Column(db.Integer, nullable=False)
    # vat - = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    project = db.relationship('Project', backref='invoices')

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', backref='invoices')

class InvoiceSchema(mllo.ModelSchema, BaseSchema):
    user = fields.Nested('UserSchema', only=('id', 'username'))

    project = fields.Nested('ProjectSchema', only=('id', 'code', 'name'))
    client = fields.Nested('ClientSchema', only=('id', 'name'))
    class Meta:
        model = Invoice
        exclude = ('created', 'updated')
