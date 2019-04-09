from app import db, app
from models.project import Project, ProjectSchema
from models.client import Client, ClientSchema


with app.app_context():
    db.drop_all()
    db.create_all()


    clientA = Client(name='Brands at Work')
    clientB = Client(name='Swissport')
    clientC = Client(name='George P. Johnson')

    db.session.add(clientA)
    db.session.add(clientB)
    db.session.add(clientC)
    db.session.commit()

    deloitte = Project(name='Deloitte - Berlin', code='19-008', client=clientA)
    samsung = Project(name='Samsung Summer2019', code='19-009', client=clientC)
    heathrow = Project(name='HeathrowT4', code='19-010', client=clientB)
    aspire = Project(name='Aspire Lounge - Luton', code='19-011', client=clientB)
    playstation = Project(name='PlayStation - Xtreme', code='19-012', client=clientC)

    db.session.add(deloitte)
    db.session.add(samsung)
    db.session.add(heathrow)
    db.session.add(aspire)
    db.session.add(playstation)

    db.session.commit()
