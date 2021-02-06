import csv
import psycopg2
conn = psycopg2.connect("host=localhost dbname=engineer user=engineer_app password=password")
cur = conn.cursor()
cur.execute("""
    CREATE TABLE companies(
    id integer PRIMARY KEY,
    fractal_index NUMERIC(4, 3) NOT NULL
)
""")

with open('companies.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.execute(
        "INSERT INTO companies VALUES (%s, %s)",
        row
    )


cur.execute("""
    CREATE TABLE score_records(
    id SERIAL PRIMARY KEY,
    candidate_id INT NOT NULL,
    communication_score INT NOT NULL,
    coding_score INT NOT NULL,
    title TEXT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
)
""")

with open('score-records.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.copy_from(f, 'score_records', sep=',',
                      columns=['candidate_id', 'communication_score',
                      'coding_score', 'title', 'company_id'])


conn.commit()
# cur.execute('SELECT * FROM companies')
# one = cur.fetchone()
# all = cur.fetchall()
