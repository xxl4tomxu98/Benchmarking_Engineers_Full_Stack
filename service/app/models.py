from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Company(db.Model):
    __tablename__ = 'companies'

    id = db.Column(db.Integer, primary_key=True)
    fractal_index = db.Column(db.Numeric(4, 3), nullable=False)
    records = db.relationship("Record", back_populates="company")


class Record(db.Model):
    __tablename__ = "score_records"

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, nullable=False)
    communication_score = db.Column(db.Integer, nullable=False)
    coding_score = db.Column(db.Integer, nullable=False)
    title = db.Column(db.Text, nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    company = db.relationship("Company", back_populates="records")
