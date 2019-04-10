from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.project import Project
from models.supplier import Supplier


class Expense(db.Model, BaseModel):

    __tablename__ = 'expenses'

    description = db.Column(db.String(100), nullable=False)
    # date_issued = db.Column(db.DateTime, default=datetime.utcnow)
    # date_due = db.Column(db.DateTime, default=datetime.utcnow)
    # date_paid = db.Column(db.DateTime, default=datetime.utcnow)
    # pdf_link = db.Column(db.Text)
    amount = db.Column(db.Integer, nullable=False)
    # vat - = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    project = db.relationship('Project', backref='expenses')

    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.id'))
    supplier = db.relationship('Supplier', backref='expenses')


class ExpenseSchema(mllo.ModelSchema, BaseSchema):
    project = fields.Nested('ProjectSchema', only=('id', 'code'))
    supplier = fields.Nested('SupplierSchema', only=('id', 'name'))

    class Meta:
        model = Expense
        exclude = ('created', 'updated')
