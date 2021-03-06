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

    deloitte = Project(user=orjon, name='Deloitte, Berlin', code='19-008', client=clientA)
    samsung = Project(user=orjon, name='Samsung Summer2019', code='19-009', client=clientC)
    heathrow = Project(user=orjon, name='HeathrowT4', code='19-010', client=clientB)
    aspire = Project(user=orjon, name='Aspire Lounge, Luton', code='19-011', client=clientB)
    playstation = Project(user=orjon, name='PlayStation, Xtreme', code='19-012', client=clientC)

    inv1 = Invoice(user=orjon, number='INV-001', amount=1250,
        date_issued='2019-02-11', date_due='2019-03-10', date_paid='2019-03-21',
        description='3D visualisation', client=clientC, project=samsung)
    inv2 = Invoice(user=orjon, number='INV-002', amount=250,
        date_issued='2019-02-25', date_due='2019-03-24', date_paid='2019-03-11',
        description='Technical Documentation', client=clientB, project=aspire)
    inv3 = Invoice(user=orjon, number='INV-003', amount=1850,
        date_issued='2019-03-02', date_due='2019-04-01', date_paid=None,
        description='3D visualisation & printing', client=clientC, project=playstation,
        pdf='http://www.orjon.com/dev/project4/sampleInvoice.pdf')
    inv4 = Invoice(user=orjon, number='INV-004', amount=750,
        date_issued='2019-03-11', date_due='2019-04-10', date_paid=None,
        description='3D model', client=clientB, project=heathrow)
    inv5 = Invoice(user=orjon, number='INV-005', amount=640,
        date_issued='2019-04-03', date_due='2019-05-02', date_paid=None,
        description='3D animation', client=clientA, project=deloitte,
        pdf='http://www.orjon.com/dev/project4/sampleInvoice.pdf')
    inv6 = Invoice(user=orjon, number='INV-006', amount=1200,
        date_issued='2019-04-10', date_due='2019-05-09', date_paid=None,
        description='3D visualisation & detailing', client=clientA, project=deloitte)

    permier_inn = Supplier(user=orjon, name='Permier Inn')
    uber = Supplier(user=orjon, name='Uber')
    j_kemp = Supplier(user=orjon, name='Justin Kemp')
    apple = Supplier(user=orjon, name='Apple Inc')

    expense0 = Expense(user=orjon, description='Contractor expense',
        date='2019-03-11', amount=976.90, project=samsung, supplier=j_kemp)
    expense1 = Expense(user=orjon, description='Contractor expense',
        date='2019-01-09', amount=123.10, project=samsung, supplier=j_kemp)
    expense2 = Expense(user=orjon, description='Accommodation',
        date='2019-02-16', amount=206.25, project=aspire, supplier=permier_inn)
    expense3 = Expense(user=orjon, description='Travel',
        date='2019-02-27', amount=30.00, project=playstation, supplier=uber)
    expense4 = Expense(user=orjon, description='Equipment',
        date='2019-02-19', amount=421.77, project=heathrow, supplier=apple)
    expense5 = Expense(user=orjon, description='Contractor expense',
        date='2019-02-06', amount=150.00, project=samsung, supplier=j_kemp)
    expense6 = Expense(user=orjon, description='Accommodation',
        date='2019-03-29', amount=250.50, project=deloitte, supplier=permier_inn)
    expense7 = Expense(user=orjon, description='Travel',
        date='2019-02-20', amount=35.50, project=aspire, supplier=uber)
    expense8 = Expense(user=orjon, description='Equipment',
        date='2019-02-15', amount=450.00, project=playstation, supplier=apple)
    expense9 = Expense(user=orjon, description='Travel',
        date='2019-02-22', amount=42.50, project=aspire, supplier=uber)
    expense10 = Expense(user=orjon, description='Equipment',
        date='2019-03-02', amount=60, project=heathrow, supplier=apple)

    db.session.add(clientA)
    db.session.add(clientB)
    db.session.add(clientC)

    db.session.add(deloitte)
    db.session.add(samsung)
    db.session.add(heathrow)
    db.session.add(aspire)
    db.session.add(playstation)

    db.session.add(inv4)
    db.session.add(inv5)
    db.session.add(inv1)
    db.session.add(inv2)
    db.session.add(inv3)
    db.session.add(inv6)

    db.session.add(permier_inn)
    db.session.add(uber)
    db.session.add(j_kemp)
    db.session.add(apple)

    db.session.add(expense0)

    db.session.add(expense5)
    db.session.add(expense6)
    db.session.add(expense7)
    db.session.add(expense8)
    db.session.add(expense9)
    db.session.add(expense1)
    db.session.add(expense2)
    db.session.add(expense3)
    db.session.add(expense4)
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

    inv7 = Invoice(user=bill, number='BILL-#01', amount=850,
        date_issued='2019-01-13', date_due='2019-02-12', date_paid='2019-02-01',
        description='Wedding photoshoot', client=clientD, project=photo1)
    inv8 = Invoice(user=bill, number='BILL-#02', amount=2200,
        date_issued='2019-01-14', date_due='2019-02-13', date_paid='2019-02-10',
        description='Family reunion photoshoot', client=clientE, project=photo2)
    inv9 = Invoice(user=bill, number='BILL-#03', amount=935,
        date_issued='2019-01-23', date_due='2019-02-22', date_paid='2019-02-05',
        description='Love Celebration photoshoot', client=clientF, project=photo3)
    inv10 = Invoice(user=bill, number='BILL-#04', amount=3250,
        date_issued='2019-02-10', date_due='2019-03-09', date_paid=None,
        description='Mother & Baby photoshoot', client=clientG, project=photo4)
    inv11 = Invoice(user=bill, number='BILL-#05', amount=1150,
        date_issued='2019-03-25', date_due='2019-04-24', date_paid=None,
        description='Christmas party photoshoot', client=clientH, project=photo5)

    ramada = Supplier(user=bill, name='Ramada Hotel')
    uber1 = Supplier(user=bill, name='Uber')
    costa = Supplier(user=bill, name='Costa Coffee')
    leylands = Supplier(user=bill, name='Leylands')

    expense11 = Expense(user=bill, description='Travel',
        date='2019-01-10', amount=135.50, project=photo1, supplier=uber1)
    expense12 = Expense(user=bill, description='Equipment',
        date='2019-01-10', amount=45.0, project=photo1, supplier=leylands)
    expense13 = Expense(user=bill, description='Travel',
        date='2019-01-13', amount=420.50, project=photo2, supplier=uber1)
    expense14 = Expense(user=bill, description='Equipment',
        date='2019-01-20', amount=160, project=photo3, supplier=leylands)
    expense15 = Expense(user=bill, description='Sustenance',
        date='2019-02-06', amount=4.58, project=photo4, supplier=costa)
    expense16 = Expense(user=bill, description='Accommodation',
        date='2019-02-06', amount=60, project=photo4, supplier=ramada)

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
