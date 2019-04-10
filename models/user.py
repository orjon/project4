from datetime import datetime, timedelta
from app import db, mllo, bcrypt
from config.environment import secret
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from models.base import BaseModel, BaseSchema
from marshmallow import validates_schema, ValidationError, fields, validate

class User(db.Model, BaseModel):

    __tablename__: 'users'

    username = db.Column(db.String(28), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    company = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(128))

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
        'exp': datetime.utcnow()+timedelta(days=1),
        'iat': datetime.utcnow(), #issued at timedelta
        'sub': self.id #User.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token

class UserSchema(mllo.ModelSchema, BaseSchema):

    # @validates_schema
    #
    # def check_passwords_match(self, data):
    #     if data.get('password') != data.get('password_confirmation'):
    #         raise ValidationError('Passwords do not match', 'password_confirmation')

    password = fields.String(
        required=True,
        validate=[validate.Length(min=8, max=50)]
    )

    password_confirmation = fields.String(
        required=True
    )

    # created_projects = fields.Nested('ProjectSchema', many=True)

    class Meta:
        model = User
        exclude = ('password_hash',)
