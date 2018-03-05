import React from 'react';
import { connect } from 'react-redux';
import Items from '../Items';
import Checkout from '../Checkout';
import styles from './index.css';

const App = ({ checkout, dispatch, items }) => (
  <section>
    <h1 className={styles.title}>A <em>very</em> simple shop with a checkout</h1>
    <Items dispatch={dispatch} items={items} />
    <Checkout dispatch={dispatch} checkout={checkout} />
  </section>
);


export default connect(state => ({
  items: state.data.items,
  checkout: state.data.checkout,
}))(App);
