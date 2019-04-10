from app import db, mllo
from marshmallow import fields
from .base import BaseModel, BaseSchema
from .project import Project


class Invoice(db.Model, BaseModel):

    __tablename__ = 'invoices'

    number = db.Column(db.String(10), nullable=False)

    # date_issued = db.Column(db.DateTime, default=datetime.utcnow)
    # date_due = db.Column(db.DateTime, default=datetime.utcnow)
    # date_paid = db.Column(db.DateTime, default=datetime.utcnow)
    # pdf_link = db.Column(db.Text)
    amount = db.Column(db.Integer, nullable=False)
    # vat - = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    project = db.relationship('Project', backref='invoices')


class InvoiceSchema(mllo.ModelSchema, BaseSchema):
    project = fields.Nested('ProjectSchema', only=('id', 'code'))
    class Meta:
        model = Invoice

#
# If you test through Insomnia, invoices will not be on the projects
# Import fields (from marshmallow): from marshmallow import fields
# In the ProjectSchema class, above class Meta add:
# invoices = fields.Nested('CommentSchema', many=True, exclude=('project',))
# Trailing comment is important because a tuple with one item in it without a trailing comma fails
