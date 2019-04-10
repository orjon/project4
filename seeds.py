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

    clientA = Client(name='Brands at Work')
    clientB = Client(name='Swissport')
    clientC = Client(name='George P. Johnson')

    clientD = Client(name='Simon Parker')
    clientE = Client(name='The Greenwards')
    clientF = Client(name='Paul & Athony')
    clientG = Client(name='Ducan Loache')
    clientH = Client(name='NatWest')

    # clientI = Client(name='Paul & Athony')
    # clientJ = Client(name='Ducan Loache')
    # clientK = Client(name='NatWest')
    # clientL = Client(name='NatWest')

    db.session.add(clientA)
    db.session.add(clientB)
    db.session.add(clientC)

    db.session.add(clientD)
    db.session.add(clientE)
    db.session.add(clientF)
    db.session.add(clientG)
    db.session.add(clientH)

    # db.session.add(clientI)
    # db.session.add(clientJ)
    # db.session.add(clientK)
    # db.session.add(clientL)

    deloitte = Project(name='Deloitte - Berlin', code='19-008', client=clientA)
    samsung = Project(name='Samsung Summer2019', code='19-009', client=clientC)
    heathrow = Project(name='HeathrowT4', code='19-010', client=clientB)
    aspire = Project(name='Aspire Lounge - Luton', code='19-011', client=clientB)
    playstation = Project(name='PlayStation - Xtreme', code='19-012', client=clientC)

    photo1 = Project(name='Simon & Kate', code='BP-01', client=clientD)
    photo2 = Project(name='Peter & Ellenor', code='BP-02', client=clientE)
    photo3 = Project(name='Paul & Anthony', code='BP-03', client=clientF)
    photo4 = Project(name='Baby Jane', code='BP-04', client=clientG)
    photo5 = Project(name='NatWest Conference', code='BP-05', client=clientH)

    db.session.add(deloitte)
    db.session.add(samsung)
    db.session.add(heathrow)
    db.session.add(aspire)
    db.session.add(playstation)


    inv1 = Invoice(number='INV-001', amount=100, project=samsung)
    inv2 = Invoice(number='INV-002', amount=200, project=aspire)
    inv3 = Invoice(number='INV-003', amount=300, project=playstation)
    inv4 = Invoice(number='INV-004', amount=400, project=heathrow)
    inv5 = Invoice(number='INV-005', amount=750, project=deloitte)
    inv6 = Invoice(number='INV-006', amount=120, project=deloitte)

    db.session.add(inv1)
    db.session.add(inv2)
    db.session.add(inv3)
    db.session.add(inv4)
    db.session.add(inv5)
    db.session.add(inv6)
    db.session.commit()

    permier_inn = Supplier(name='Permier Inn')
    uber = Supplier(name='Uber')
    j_kemp = Supplier(name='Justin Kemp')
    apple = Supplier(name='Apple Inc')

    db.session.add(permier_inn)
    db.session.add(uber)
    db.session.add(j_kemp)
    db.session.add(apple)


    expense1 = Expense(description='Contractor expense', amount=100, project=samsung, supplier=j_kemp)
    expense2 = Expense(description='Accomodation', amount=200, project=aspire, supplier=permier_inn)
    expense3 = Expense(description='Travel', amount=30.00, project=playstation, supplier=uber)
    expense4 = Expense(description='Equipment', amount=400, project=heathrow, supplier=apple)
    expense5 = Expense(description='Contractor expense', amount=150, project=samsung, supplier=j_kemp)
    expense6 = Expense(description='Accomodation', amount=250, project=deloitte, supplier=permier_inn)
    expense7 = Expense(description='Travel', amount=35.50, project=aspire, supplier=uber)
    expense8 = Expense(description='Equipment', amount=450, project=playstation, supplier=apple)
    expense9 = Expense(description='Travel', amount=42.50, project=aspire, supplier=uber)
    expense10 = Expense(description='Equipment', amount=60, project=heathrow, supplier=apple)

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
    db.session.commit()
