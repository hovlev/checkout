import React from 'react';
import actions from '../../actions';
import currencyConvertor from '../../helpers/currency';
import styles from './index.css';

const Checkout = ({ checkout, dispatch }) => [(
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
            onClick={() => dispatch({ type: actions.ITEM_INCREMENT, payload: { item, increment: -1 } })}
          >
            -
          </a>
          {item.quantity}
          <a
            className={styles.modifier}
            href="#addOneItem"
            onClick={() => dispatch({ type: actions.ITEM_INCREMENT, payload: { item, increment: 1 } })}
          >
            +
          </a>
          <a
            href="#addOneItem"
            onClick={() => dispatch({ type: actions.ITEM_REMOVE, payload: item })}
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

export default Checkout;
