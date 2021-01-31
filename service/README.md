## Backend Setup and Process
- The two data csv files are converted to sql(engineers.sql) file that will define the two tables as postgresql database table and seed data from the csv files into the database tables
  -- ```psql -d engineer -U engineer_app < ./engineers.sql```
  -- Type of columns were specifically given and not null were spelled as well,
  -- The company_id is PK for companies table and FK for records table
  -- Database postgresql named "engineer" were created with owner "engineer_app" and password "password".
     ```create user engineer_app createdb password 'password'; ```
     ```create database engineer with owner engineer_app; ```

## Flask App
- Since the tables are relational even though only two are present, For the sake of better query backend Flask sever are built to connect to the database and fetch data as needed.
- .env and .flaskenv were created for environmental variables and entrypoint folder/files specification
- Model schema were created with SqlAlchemy model against DB in file models.py
- In the file init.py within app folder the library dependencies were imported, connection to DB were setup and     initial flask app initiated. Please see detailed comments in the files for further reference.
- First, a Hello World index page were tested to see if Flask app works. it is on ```http://localhost:5000/```
- Then endpoint of routes for database query and filtering and calculations are carried out with helper functions.
- The output of the json on port 5000 are tested to work. ```http://localhost:5000/candidates/candidate_id/```
  -- pipenv were were used to create isolated environment in service
  ``` pipenv install``` will install dependencies in the Pipfile
  ``` pipenv shell``` will activate the shell, then
  ``` flask run ``` will run the flask app

## Fronend React App
- ```npm install``` will install dependencies
- key Ajax code that fetch flask endpoint json dataset can be seen as below:
``` fetchPercentiles = async () => {
    const candidate_id = this.state.candidate_id;
    const response = await fetch(`/candidates/${candidate_id}`);
    const { communication, coding } = await response.json();
    this.setState({
      comm_percentile: communication,
      code_percentile: coding
    })
  }
```

# Cross Origin Resourse Sharing
- CORS issue has to be addressed because I am rendering on port 8000 from data from port 5000
  -- the code to prevent CORS porblem is to have the following proxy declaration in client/package.json.

  ``` "proxy": "http://localhost:5000" ```


# Test React
- A prelimnary test skeleton was started and unfortunately I could not finish that on time. I have set up testIds object where data-testid locations can be sepecified for DOM rendering testing.
- The index.js, App.js, and Percentile.js files are added props where initial input candidate_ids can be passed along to the child components.
- The tests logic and methodology scheme were planned. Will need some inital calculations on percentiles for large number of cases and come up with results to compare to query data result.
- Current main concerns are user input candidate_id falls out of range so no candidate can be identified.
