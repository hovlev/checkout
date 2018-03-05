// a simple currency formatter that always returns a £ symbol and 2 decimal places
export default total =>
  `£${total.toFixed(2)}`;
