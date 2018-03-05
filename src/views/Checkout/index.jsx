import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import currencyConvertor from '../../helpers/currency';
import styles from './index.css';

const Checkout = ({ checkout, incrementItem, removeItem }) => [(
  <ul
    className={styles.checkout}
    key="0"
  >
    {checkout.items.length ?
      checkout.items.map(item => (
        <li key={item.id}>
          {item.id} - {item.description} -
          <a
            className={styles.modifier}
            href="#removeOneItem"
            onClick={() => incrementItem(item, -1)}
          >
            -
          </a>
          {item.quantity}
          <a
            className={styles.modifier}
            href="#addOneItem"
            onClick={() => incrementItem(item, 1)}
          >
            +
          </a>
          <a
            href="#addOneItem"
            onClick={() => removeItem(item)}
          >
            Remove item
          </a>
        </li>
    )) : <li>No items selected yet...</li> }
  </ul>),
  <p
    className={styles.total}
    key="1"
  >
    Total: {currencyConvertor(checkout.total)}
  </p>,
];


const mapToDispatchProps = dispatch => ({
  incrementItem: (item, incrementBy) => dispatch({ type: actions.ITEM_INCREMENT, payload: { item, increment: incrementBy } }),
  removeItem: item => dispatch({ type: actions.ITEM_REMOVE, payload: item }),
});

export default connect(state => ({
  checkout: state.data.checkout,
}), mapToDispatchProps)(Checkout);
