from app import db, mllo
from .base import BaseModel


class Project(db.Model, BaseModel):

    __tablename__ = 'projects'

    code = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    # location_lat = db.Column(db.Integer)
    # location_lng = db.Column(db.Integer)
    # date_start = db.Column()
    # date_end = db.Column()


class ProjectSchema(mllo.ModelSchema):

    class Meta:
        model = Project
