from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema


class Supplier(db.Model, BaseModel):
    __tablename__ = 'suppliers'
    name = db.Column(db.String(40), nullable=False)
    # contact = db.Column(db.Srting)
    # email

class SupplierSchema(mllo.ModelSchema, BaseSchema):

    expenses = fields.Nested('ExpenseSchema', many=True, only=('id', 'description', 'project.code'))
    class Meta:
        model = Supplier
        exclude = ('created', 'updated')
