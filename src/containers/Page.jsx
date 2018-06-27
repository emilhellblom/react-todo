import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, editItem, deleteItem } from '../actions/items';
import AddItem from '../components/AddItem';
import EditItem from '../components/EditItem';

// import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      addItemForm: false,
      editItemForm: false,
    };
    this.alertTime = this.alertTime.bind(this);
    this.renderAddItemForm = this.renderAddItemForm.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
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

  handleAddSubmit(e) {
    const { addItem } = this.props;
    addItem(e);
    this.setState({ addItemForm: false });
  }

  handleEditSubmit(e) {
    const { editItem } = this.props;
    console.log(e);
    editItem(e);
    this.setState({ editItemForm: false });
  }

  renderEditItemForm(bool) {
    this.setState({ editItemForm: bool });
  }

  renderAddItemForm() {
    this.setState({ addItemForm: true });
  }


  render() {
    const { items, deleteItem } = this.props;
    const { date, addItemForm, editItemForm } = this.state;

    this.alertTime();

    return (
      <div className="Page">
        <div>
          <p>
            {date.toLocaleTimeString()}
          </p>
        </div>
        {addItemForm && <AddItem onSubmit={this.handleAddSubmit} />}
        {!addItemForm && (
        <button type="button" onClick={() => this.renderAddItemForm()}>
          Add Item
        </button>)}
        {!editItemForm && !addItemForm && items.length > 0 && (
        <button type="button" onClick={() => this.renderEditItemForm(true)}>
          Edit
        </button>)}
        {editItemForm && !addItemForm && items.length > 0 && (
        <button type="button" onClick={() => this.renderEditItemForm(false)}>
          Cancel Edit
        </button>)}
        {items && items.map(item => (
          <div key={item.title}>
            {!editItemForm && (
            <div>
              <h2>
                {item.title}
              </h2>
              <h2>
                {item.description}
              </h2>
              <h2>
                {item.date}
                {item.time}
              </h2>

            </div>)}
            {editItemForm && <EditItem onSubmit={this.handleEditSubmit} title={item.title} />}
            <button type="button" onClick={() => deleteItem(item.title)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };
}

const mapStateToProps = state => ({ items: state.items });


export default connect(mapStateToProps, { addItem, editItem, deleteItem })(Page);
