import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AddIcon, CheckIcon } from '../assets/icons';
import { INPUT_FIELDS } from './inputFields';

export default class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      time: '',
      date: '',
    };

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
    const { handleSubmit, editing, title } = this.props;
    // Override 'Title' value when editing.
    if (editing) {
      handleSubmit(Object.assign(this.state, { title }), 'edit')
    } else {
      handleSubmit(this.state, 'add');
    }
  }

  render() {
    const { editing, title } = this.props;
    let inputFields = INPUT_FIELDS;
    // Don't render 'Title' input field when editing.
    if (editing) {
      const fields = INPUT_FIELDS.concat();
      fields.splice(0, 1);
      inputFields = fields;
    }
    return (
      <div className={`edit-form editing-${editing}`}>
        {editing && (
          <h2>
            {title}
          </h2>
        )}
        <form onSubmit={this.handleSubmit}>
          {inputFields.map(field => (
            <div className="form-input" key={field.name}>
              <label>
                {field.name}
              </label>
              <input maxLength="50" name={field.name.toLowerCase()} type={field.type} onChange={this.handleChange} />
            </div>
          ))}
          <button type="submit">
            {editing ? <CheckIcon /> : <AddIcon />}
          </button>
        </form>
      </div>
    );
  }
}

ItemForm.propTypes = {
  editing: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ItemForm.defaultProps = {
  title: null,
};
