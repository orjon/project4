import os #for eventual production
secret = os.getenv('SECRET', 'project4secret')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/db')
