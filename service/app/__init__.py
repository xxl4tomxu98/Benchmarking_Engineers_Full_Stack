from flask import Flask, jsonify
from .models import db, Company, Record
from os import environ
import math
import numpy as np


# use config class to connect sqlAlchemy to postgresql database
class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL") or \
        "postgresql://engineer_app:password@localhost/engineer"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# test route
@app.route('/')
def hello():
    return "Hello World!"


# Route endpoint for frontend React to call
@app.route("/candidates/<int:id>")
def cal_percentile(id):
    # filter out candidate from candidate_id and get their scores
    candidate = Record.query.filter(Record.candidate_id == id).first()
    if not candidate:
      return jsonify({'communication': "no candidate_id exist", 'coding': "no candidate_id exist"})

    candidate_comm = candidate.communication_score
    candidate_code = candidate.coding_score
    #get company from company_id
    candidate_company = Company.query.get_or_404(candidate.company_id)
    all_companies = Company.query.all()
    # get comparable companies and their ids to the candidate_company
    com_companies = [com for com in all_companies if are_similar(candidate_company, com)]
    com_companies_id = [com.id for com in com_companies]
    #get all engineers that has the same title as the candidate and also in comparable companies
    same_title_eng = Record.query.filter(Record.title == candidate.title).all()
    same_title_eng_comparable = [rec for rec in same_title_eng if rec.company_id in com_companies_id]
    #print(same_title_eng_comparable)
    # obtain array of the scores for the comparable company engineers with same title
    com_score_comm = [eng.communication_score for eng in same_title_eng_comparable]
    com_score_code = [eng.coding_score for eng in same_title_eng_comparable]
    # scores are sorted and muted in place so that later percentile can be calculated
    com_score_comm.sort()
    com_score_code.sort()
    # calculate percentile this way is better
    for (idx, value) in enumerate(com_score_comm):
        if value == candidate_comm:
            comm_percentile = (idx + 1)/len(com_score_comm) * 100
            print(value, idx, len(com_score_comm))
    for (idx, value) in enumerate(com_score_code):
        if value == candidate_code:
            code_percentile = (idx + 1)/len(com_score_code) * 100
            print(value, idx, len(com_score_code))
    # comm_percentile = generate_percentile(candidate_comm, com_score_comm)
    # code_percentile = generate_percentile(candidate_code, com_score_code)
    return jsonify({'communication': comm_percentile, 'coding': code_percentile})


# helper function for selecting comparable companies
def are_similar(company_1, company_2):
    return math.fabs(company_1.fractal_index - company_2.fractal_index) < 0.15


# helper function for calculating candidate score percentile among comparable
# company engineers with the same title
def generate_percentile(score, arr_score):
    if not arr_score or not score:
        return None
    for p in range(0, 101, 1):
        # as p goes up 1 at a time, compare calculated
        # percentile value with candidate score if relative diff
        # is less than certain tolerance, return the p value
        if abs((np.percentile(arr_score, p) - score)/score) <= 0.02:
            return p
