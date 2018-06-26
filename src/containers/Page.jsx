import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/items';
import AddItem from '../components/AddItem';

// import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.alertTime = this.alertTime.bind(this);
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

  render() {
    const { items } = this.props;
    const { date } = this.state;

    this.alertTime();

    return (
      <div className="Page">
        <AddItem />
        <p>
          {date.toLocaleTimeString()}
        </p>
        {items.map(item => (
          <div key={`Item: ${item.title}`}>
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
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    );
  };
}

const mapStateToProps = state => ({ items: state.items });


export default connect(mapStateToProps, { addItem })(Page);
