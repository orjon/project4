from app import db, app
from models.project import Project


with app.app_context():
    db.drop_all()
    db.create_all()

    deloitte = Project(name='Deloitte - Berlin', code='19-008')
    samsung = Project(name='Samsung Summer2019', code='19-009')
    heathrow = Project(name='HeathrowT4', code='19-010')
    aspire = Project(name='Aspire Lounge - Luton', code='19-011')
    playstation = Project(name='PlayStation - Xtreme', code='19-012')

    db.session.add(deloitte)
    db.session.add(samsung)
    db.session.add(heathrow)
    db.session.add(aspire)
    db.session.add(playstation)

    db.session.commit()
