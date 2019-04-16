from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.project import Project
from models.supplier import Supplier
from models.user import User, UserSchema



class Expense(db.Model, BaseModel):

    __tablename__ = 'expenses'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='expenses')

    description = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    # pdf_link = db.Column(db.Text)
    amount = db.Column(db.Float, nullable=False)
    # vat - = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    project = db.relationship('Project', backref='expenses')

    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.id'))
    supplier = db.relationship('Supplier', backref='expenses')

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', backref='expenses')


class ExpenseSchema(mllo.ModelSchema, BaseSchema):
    user = fields.Nested('UserSchema', only=('id', 'username'))
    project = fields.Nested('ProjectSchema', only=('id', 'code', 'name', 'client.name'))
    supplier = fields.Nested('SupplierSchema', only=('id', 'name'))

    class Meta:
        model = Expense
        exclude = ('created', 'updated')
