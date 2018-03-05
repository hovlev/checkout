import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import currencyConvertor from '../../helpers/currency';
import styles from './index.css';

const Items = ({ items, addItemToBasket }) => (
  <ul>
    {items.map(item => (
      <Item
        addItemToBasket={addItemToBasket}
        item={item}
        key={item.id}
      />
    ))}
  </ul>);

const Item = ({ addItemToBasket, item }) => (
  <li className={styles.item}>
    <h2>{item.description}</h2>
    <p>{currencyConvertor(item.price)}</p>
    <a href="#addToBasket" onClick={() => addItemToBasket(item)}>
      Add to basket
    </a>
  </li>);

const mapToDispatchProps = dispatch => ({
  addItemToBasket: item => dispatch({ type: actions.ITEM_ADD, payload: item }),
});

export default connect(state => ({
  items: state.data.items,
}), mapToDispatchProps)(Items);
