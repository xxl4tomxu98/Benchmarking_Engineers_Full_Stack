import React from 'react';

class Percentiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comm_percentile: 0,
      code_percentile: 0,
      candidate_id: this.props.candidates[0],
    };
    this.selectCandidate = this.selectCandidate.bind(this);
  }

  selectCandidate(e) {
    this.setState({
      candidate_id: parseInt(e.target.value, 10)
    })
  }


  fetchPercentiles = async () => {
    const candidate_id = this.state.candidate_id;
    const response = await fetch(`/candidates/${candidate_id}`);
    const { communication, coding } = await response.json();
    this.setState({
      comm_percentile: communication,
      code_percentile: coding
    })
  }

  render() {
    const { comm_percentile, code_percentile } = this.state;
    return (
      <React.Fragment>
          <div className="controls">
              <input type="text" className="filter-input" data-testid="candidate-id"
                  onChange={this.selectCandidate}/>
          </div>

          <button onClick={(e) => {
                  e.preventDefault();
                  this.fetchPercentiles();
              }}> Fetch Your Percentiles
          </button>
          <ul className="benchmarking-list">
              <li data-testid="communication-percentile">Communication Score Percentile:  {comm_percentile}</li>
              <li data-testid="coding-percentile">Coding Score Percentile:  {code_percentile}</li>
          </ul>
      </React.Fragment>
    );
  }
}

export default Percentiles;
