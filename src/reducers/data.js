import { __, add, assoc, assocPath, equals, filter, findIndex, gt, ifElse, inc, insert, isNil, merge, multiply, not, path, prop, propEq, reduce } from 'ramda';

const init = {
  items: [],
  checkout: {
    items: [],
    total: 0,
  },
};

const defaultItem = {
  quantity: 1,
};

const calculateTotal = (updatedItems, state) => {
  const checkout = prop('checkout', state);
  const total = reduce(
    (val, item) => add(multiply(prop('price', item), prop('quantity', item)), val), 0, updatedItems);
  const updatedCheckout = merge(checkout, {
    items: updatedItems,
    total,
  });
  return assoc('checkout', updatedCheckout, state);
};

const addItemToCheckout = (item, state) => {
  const itemId = prop('id', item);
  const checkout = path(['checkout', 'items'], state);
  const indexInCheckout = findIndex(propEq('id', itemId), checkout, state);
  const itemInCheckout = prop(indexInCheckout, checkout);
  const updatedItems = ifElse(
    isNil,
    () => insert(0, merge(item, defaultItem), checkout),
    () => assocPath([indexInCheckout, 'quantity'], inc(path([indexInCheckout, 'quantity'], checkout)), checkout)
  )(itemInCheckout);
  return calculateTotal(updatedItems, state);
};

const incrementItem = ({ item, increment }, state) => {
  const itemId = prop('id', item);
  const checkout = path(['checkout', 'items'], state);
  const indexInCheckout = findIndex(propEq('id', itemId), checkout, state);
  const updatedQuantity = add(path([indexInCheckout, 'quantity'], checkout), increment);
  const updatedCheckout = assocPath([indexInCheckout, 'quantity'], updatedQuantity, checkout);
  const updatedItems = ifElse(
    gt(__, 0),
    () => assocPath([indexInCheckout, 'quantity'], updatedQuantity, updatedCheckout),
    () => filter(itemToFilter => gt(prop('quantity', itemToFilter), 0), updatedCheckout)
  )(updatedQuantity);
  return calculateTotal(updatedItems, state);
};

const removeItem = (item, state) => {
  const itemId = prop('id', item);
  const checkout = path(['checkout', 'items'], state);
  const updatedItems = filter(itemToFilter => not(equals(itemId, prop('id', itemToFilter))), checkout);
  return calculateTotal(updatedItems, state);
};

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'ITEMS_LOADED':
      return merge(state, payload);
    case 'ITEM_ADD':
      return addItemToCheckout(payload, state);
    case 'ITEM_INCREMENT':
      return incrementItem(payload, state);
    case 'ITEM_REMOVE':
      return removeItem(payload, state);
    default: {
      return state;
    }
  }
};
