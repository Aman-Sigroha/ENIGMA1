import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numRiders: '',
      numDrivers: '',
      vehicleType: '',
      expectedDuration: '',
      result: null
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      num_riders: this.state.numRiders,
      num_drivers: this.state.numDrivers,
      vehicle_type: this.state.vehicleType,
      expected_duration: this.state.expectedDuration
    };
    axios.post('/predict', data)
      .then(res => {
        this.setState({ result: res.data.result });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="App" class="App">
        <h1>Fastr</h1>
        <form onSubmit={this.handleSubmit}>
          <label class="formLabel">
            number of riders:
            <input class="form-input" type="number" name="numRiders" value={this.state.numRiders} onChange={this.handleChange} />
          </label>
          <label class="formLabel"> 
            number of drivers:
            <input class="form-input" type="number" name="numDrivers" value={this.state.numDrivers} onChange={this.handleChange} />
          </label>
          <label class="formLabel">
            vehicle type:
            <input class="form-input" type="text" name="vehicleType" value={this.state.vehicleType} onChange={this.handleChange} />
          </label>
          <label class="formLabel">
            expected ride duration:
            <input class="form-input" type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={this.handleChange} />
          </label>
          <button type="submit" class= "submitButton">Generate price</button>
        </form>
        {this.state.result && <p>Result: {this.state.result}</p>}
      </div>
    );
  }
}

export default App;