import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addItem, editItem, deleteItem } from '../actions/items';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';


// import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      adding: false,
      editing: false,
    };
    this.alertTime = this.alertTime.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  alertTime() {
    const { items } = this.props;
    const { date } = this.state;
    let itemDue;
    items.forEach((item) => {
      if (Date.parse(`${item.date}:${item.time}`) === Date.parse(date)) {
        itemDue = item;
      }
    });
    if (itemDue) {
      alert(itemDue.title);
    }
  }

  handleSubmit(e, action) {
    const { addItem, editItem } = this.props;
    action === 'add' ? addItem(e) : editItem(e);
    this.setState({
      editing: false,
      adding: false,
    })
  }

  toggleForm(action) {
    if (action === 'add') {
      this.setState({
        adding: true,
      });
    } else if (action === 'edit') {
      this.setState({
        editing: true,
      });
    } else {
      this.setState({
        editing: false,
        adding: false,
      });
    }
  }

  render() {
    const { items, deleteItem } = this.props;
    const { date, renderForm, adding, editing } = this.state;

    this.alertTime();

    return (
      <div className="page">
        <div>
          <p>
            {date.toLocaleTimeString()}
          </p>
        </div>
        <ItemList
          renderForm={renderForm}
          items={items}
          adding={adding}
          editing={editing}
          deleteItem={deleteItem}
          toggleForm={this.toggleForm}
          handleSubmit={this.handleSubmit}
        />
        {adding && <ItemForm editing={editing} handleSubmit={this.handleSubmit} adding={adding} />}
      </div>
    );
  }
}

Page.propTypes = {
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ items: state.items });


export default connect(mapStateToProps, { addItem, editItem, deleteItem })(Page);
