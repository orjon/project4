from app import db, app
from models.project import Project
from models.client import Client
from models.invoice import Invoice
from models.expense import Expense
from models.supplier import Supplier
from models.user import UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    orjon, errors = user_schema.load({
        'username':'orjon',
        'email':'orjon@email',
        'password':'passwordo',
        'password_confirmation':'passwordo'
    })

    if errors:
        raise Exception(errors)

    bill, errors = user_schema.load({
        'username':'bill',
        'email':'bill@email',
        'password':'passwordb',
        'password_confirmation':'passwordb'
    })

    if errors:
        raise Exception(errors)

    ted, errors = user_schema.load({
        'username':'ted',
        'email':'ted@email',
        'password':'passwordt',
        'password_confirmation':'passwordt'
    })

    if errors:
        raise Exception(errors)

    db.session.add(orjon)
    db.session.add(bill)
    db.session.add(ted)

    clientA = Client(user=orjon, name='Brands at Work')
    clientB = Client(user=orjon, name='Swissport')
    clientC = Client(user=orjon, name='George P. Johnson')

    deloitte = Project(user=orjon, name='Deloitte - Berlin', code='19-008', client=clientA)
    samsung = Project(user=orjon, name='Samsung Summer2019', code='19-009', client=clientC)
    heathrow = Project(user=orjon, name='HeathrowT4', code='19-010', client=clientB)
    aspire = Project(user=orjon, name='Aspire Lounge - Luton', code='19-011', client=clientB)
    playstation = Project(user=orjon, name='PlayStation - Xtreme', code='19-012', client=clientC)

    inv1 = Invoice(user=orjon, number='INV-001', amount=100, client=clientC, project=samsung)
    inv2 = Invoice(user=orjon, number='INV-002', amount=200, client=clientB, project=aspire)
    inv3 = Invoice(user=orjon, number='INV-003', amount=300, client=clientC, project=playstation)
    inv4 = Invoice(user=orjon, number='INV-004', amount=400, client=clientB, project=heathrow)
    inv5 = Invoice(user=orjon, number='INV-005', amount=750, client=clientA, project=deloitte)
    inv6 = Invoice(user=orjon, number='INV-006', amount=120, client=clientA, project=deloitte)

    permier_inn = Supplier(user=orjon, name='Permier Inn')
    uber = Supplier(user=orjon, name='Uber')
    j_kemp = Supplier(user=orjon, name='Justin Kemp')
    apple = Supplier(user=orjon, name='Apple Inc')

    expense1 = Expense(user=orjon, description='Contractor expense', amount=100, project=samsung, supplier=j_kemp)
    expense2 = Expense(user=orjon, description='Accomodation', amount=200, project=aspire, supplier=permier_inn)
    expense3 = Expense(user=orjon, description='Travel', amount=30.00, project=playstation, supplier=uber)
    expense4 = Expense(user=orjon, description='Equipment', amount=400, project=heathrow, supplier=apple)
    expense5 = Expense(user=orjon, description='Contractor expense', amount=150, project=samsung, supplier=j_kemp)
    expense6 = Expense(user=orjon, description='Accomodation', amount=250, project=deloitte, supplier=permier_inn)
    expense7 = Expense(user=orjon, description='Travel', amount=35.50, project=aspire, supplier=uber)
    expense8 = Expense(user=orjon, description='Equipment', amount=450, project=playstation, supplier=apple)
    expense9 = Expense(user=orjon, description='Travel', amount=42.50, project=aspire, supplier=uber)
    expense10 = Expense(user=orjon, description='Equipment', amount=60, project=heathrow, supplier=apple)

    db.session.add(clientA)
    db.session.add(clientB)
    db.session.add(clientC)

    db.session.add(deloitte)
    db.session.add(samsung)
    db.session.add(heathrow)
    db.session.add(aspire)
    db.session.add(playstation)

    db.session.add(inv1)
    db.session.add(inv2)
    db.session.add(inv3)
    db.session.add(inv4)
    db.session.add(inv5)
    db.session.add(inv6)

    db.session.add(permier_inn)
    db.session.add(uber)
    db.session.add(j_kemp)
    db.session.add(apple)

    db.session.add(expense1)
    db.session.add(expense2)
    db.session.add(expense3)
    db.session.add(expense4)
    db.session.add(expense5)
    db.session.add(expense6)
    db.session.add(expense7)
    db.session.add(expense8)
    db.session.add(expense9)
    db.session.add(expense10)

    clientD = Client(user=bill, name='Simon Parker')
    clientE = Client(user=bill, name='The Greenwards')
    clientF = Client(user=bill, name='Paul & Athony')
    clientG = Client(user=bill, name='Ducan Loache')
    clientH = Client(user=bill, name='NatWest')

    photo1 = Project(user=bill, name='Simon & Kate', code='BP-01', client=clientD)
    photo2 = Project(user=bill, name='Peter & Ellenor', code='BP-02', client=clientE)
    photo3 = Project(user=bill, name='Paul & Anthony', code='BP-03', client=clientF)
    photo4 = Project(user=bill, name='Baby Jane', code='BP-04', client=clientG)
    photo5 = Project(user=bill, name='NatWest Conference', code='BP-05', client=clientH)

    inv7 = Invoice(user=bill, number='BILL-#01', amount=100, client=clientD, project=photo1)
    inv8 = Invoice(user=bill, number='BILL-#02', amount=200, client=clientE, project=photo2)
    inv9 = Invoice(user=bill, number='BILL-#03', amount=300, client=clientF, project=photo3)
    inv10 = Invoice(user=bill, number='BILL-#04', amount=400, client=clientG, project=photo4)
    inv11 = Invoice(user=bill, number='BILL-#05', amount=750, client=clientH, project=photo5)

    ramada = Supplier(user=bill, name='Ramada Hotel')
    uber1 = Supplier(user=bill, name='Uber')
    costa = Supplier(user=bill, name='Costa Coffee')
    leylands = Supplier(user=bill, name='Leylands')

    expense11 = Expense(user=bill, description='Travel', amount=135.50, project=photo1, supplier=uber1)
    expense12 = Expense(user=bill, description='Equipment', amount=45.0, project=photo1, supplier=leylands)
    expense13 = Expense(user=bill, description='Travel', amount=420.50, project=photo2, supplier=uber1)
    expense14 = Expense(user=bill, description='Equipment', amount=160, project=photo3, supplier=leylands)
    expense15 = Expense(user=bill, description='Sustenance', amount=4.58, project=photo4, supplier=costa)
    expense16 = Expense(user=bill, description='Accomodation', amount=60, project=photo4, supplier=ramada)

    db.session.add(clientD)
    db.session.add(clientE)
    db.session.add(clientF)
    db.session.add(clientG)
    db.session.add(clientH)

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)

    db.session.add(inv7)
    db.session.add(inv8)
    db.session.add(inv9)
    db.session.add(inv10)
    db.session.add(inv11)

    db.session.add(ramada)
    db.session.add(uber1)
    db.session.add(costa)
    db.session.add(leylands)

    db.session.add(expense11)
    db.session.add(expense12)
    db.session.add(expense13)
    db.session.add(expense14)
    db.session.add(expense15)
    db.session.add(expense16)

    db.session.commit()
