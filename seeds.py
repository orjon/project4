from app import db, app
from models.project import Project
from models.client import Client
from models.invoice import Invoice, InvoiceSchema


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

    inv1 = Invoice(number='INV-001', amount=100, project=samsung)
    inv2 = Invoice(number='INV-002', amount=200, project=aspire)
    inv3 = Invoice(number='INV-003', amount=300, project=playstation)
    inv4 = Invoice(number='INV-004', amount=400, project=heathrow)

    db.session.add(inv1)
    db.session.add(inv2)
    db.session.add(inv3)
    db.session.add(inv4)
    db.session.commit()
