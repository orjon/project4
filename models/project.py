from app import db

class Project(db.Model)

    __tablename__='projects'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    # date_start = db.Column()
    # date_end = db.Column()
