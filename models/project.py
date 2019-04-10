from app import db, mllo
from marshmallow import fields
from .base import BaseModel, BaseSchema
from .client import Client


class Project(db.Model, BaseModel):

    __tablename__ = 'projects'

    code = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    # location_lat = db.Column(db.Integer)
    # location_lng = db.Column(db.Integer)
    # date_start = db.Column()
    # date_end = db.Column()
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', backref='projects')

class ProjectSchema(mllo.ModelSchema, BaseSchema):
    client = fields.Nested('ClientSchema', only=('id', 'name'))
    invoices = fields.Nested('InvoiceSchema', many=True, only=('id', 'number'))
    class Meta:
        model = Project
