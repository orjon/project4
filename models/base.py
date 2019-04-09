from datetime import datetime
from app import db
from marshmallow import fields

class BaseModel:

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    updated = db.Column(db.DateTime, default=datetime.utcnow)

    def save(self):
        self.updated = datetime.utcnow()
        db.session.add(self)
        db.session.commit()

    def remove(self):
        db.session.delete(self)
        db.session.commit()

class BaseSchema:
    created = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
    updated = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
