import React from 'react';
import { connect } from 'react-redux';
import Items from '../Items';
import Checkout from '../Checkout';
import styles from './index.css';

const App = () => (
  <section>
    <h1 className={styles.title}>A <em>very</em> simple shop with a checkout</h1>
    <Items />
    <Checkout />
  </section>
);

export default App;
