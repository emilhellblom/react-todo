import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/items';


class AddItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addItem(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Title
            </label>
            <input name="title" type="text" onChange={this.handleChange} />
          </div>
          <div>
            <label>
              Description
            </label>
            <input name="description" type="text" onChange={this.handleChange} />
          </div>
          <div>
            <label>
              Reminder Time
            </label>
            <input name="time" type="time" onChange={this.handleChange} />
          </div>
          <div>
            <label>
              Reminder Date
            </label>
            <input name="date" type="date" onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default connect(null, { addItem })(AddItem);
