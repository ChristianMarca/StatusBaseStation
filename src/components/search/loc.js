import React from "react";



class location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


class cajaTxt extends React.Component {
  render() {
    return <div class="card-header">Buscar RadioBase</div>
				<form>
					<div>
						<input type="text" placeholder="Ej. Azuay, Cuenca, El vecino">
        			</div>
    			</form>
			</div>;
  }
}

