import { call, takeLatest, put } from 'redux-saga/effects';
import actions from '../actions';
import 'isomorphic-fetch';

const requestItems = function* () {
  const json = yield call(() => fetch('/mock/items.json', { method: 'get' })
    .then(res => res.json()));
  yield put({ type: actions.ITEMS_LOADED, payload: json });
};

export default function* () {
  yield call(requestItems);
  yield takeLatest(actions.ITEMS_LOAD, function* () {
    yield call(requestItems);
  });
}
