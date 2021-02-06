CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    fractal_index NUMERIC(4, 3) NOT NULL
);

COPY companies(id, fractal_index)
FROM 'C:/Users/13305/Downloads/companies.csv'
WITH DELIMITER ','
CSV HEADER;


CREATE TABLE IF NOT EXISTS score_records (
    id SERIAL PRIMARY KEY,
    candidate_id INT NOT NULL,
    communication_score INT NOT NULL,
    coding_score INT NOT NULL,
    title TEXT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

COPY companies(id, candidate_id, communication_score, coding_score, title, company_id)
FROM 'C:/Users/13305/Downloads/score-records.csv'
WITH DELIMITER ','
CSV HEADER;
