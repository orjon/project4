from app import db, mllo
from marshmallow import fields
from .base import BaseModel, BaseSchema


class Client(db.Model, BaseModel):
    __tablename__ = 'clients'
    name = db.Column(db.String(40), nullable=False)


class ClientSchema(mllo.ModelSchema, BaseSchema):
    projects = fields.Nested('ProjectSchema', many=True, only=('id', 'name'))
    class Meta:
        model = Client
