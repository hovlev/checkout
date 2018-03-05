import React from 'react';
import actions from '../../actions';
import currencyConvertor from '../../helpers/currency';
import styles from './index.css';

const Items = ({ dispatch, items }) => (
  <ul>
    {items.map(item => (
      <Item
        dispatch={dispatch}
        item={item}
        key={item.id}
      />
    ))}
  </ul>);

const Item = ({ dispatch, item }) => (
  <li className={styles.item}>
    <h2>{item.description}</h2>
    <p>{currencyConvertor(item.price)}</p>
    <a href="#addToBasket" onClick={() => dispatch({ type: actions.ITEM_ADD, payload: item })}>
      Add to basket
    </a>
  </li>);

export default Items;
