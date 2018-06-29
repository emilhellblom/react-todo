import React from 'react';
import PropTypes from 'prop-types';
import ItemForm from './ItemForm';
import { AddIcon, DeleteIcon, EditIcon } from '../assets/icons';

const ButtonRow = ({ toggleForm, items, editing }) => (
  <div className='button-row'>
    <button type="button" onClick={() => toggleForm('add')}>
      <AddIcon />
    </button>
    {items && items.length > 0 && (
    <React.Fragment>
      <button type="button" onClick={() => toggleForm('edit')}>
        <EditIcon />
      </button>
      {editing && (
        <button type="button" onClick={() => toggleForm('cancel')}>
          Cancel Edit
        </button>
      )}
    </React.Fragment>)}
  </div>
)

const ItemList = ({ adding, editing, items, handleSubmit, deleteItem, toggleForm }) => (
  <div>
    <ButtonRow
      adding={adding}
      editing={editing}
      items={items}
      toggleForm={toggleForm}
    />
    {items && items.map(item => (
      <div className="list-item" key={item.title}>
        {!editing && (
        <div>
          <div className="list-item-info">
            <h4 className="item-title">
              {item.title}
            </h4>
            <h6 className="item-description">
              {item.description}
            </h6>
            <h6 className="item-date">
              {item.date} 
              {' '}
              {item.time}
            </h6>
          </div>
        </div>)}
        {editing && <ItemForm editing={editing} handleSubmit={handleSubmit} title={item.title} />}
        {!editing && (
          <div id="delete-btn" onClick={() => deleteItem(item.title)}>
            <DeleteIcon />
          </div>
        )}
      </div>
    ))}
  </div>
);

ButtonRow.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  editing: PropTypes.bool.isRequired,
};

ButtonRow.defaultProps = {
  items: [],
};

ItemList.propTypes = {
  adding: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  handleSubmit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

ItemList.defaultProps = {
  items: [],
};

export default ItemList;
