import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import word, { wordSaga } from './word';

const rootReducer = combineReducers({
  word,
  auth,
  loading,
  user,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), wordSaga()]);
}

export default rootReducer;
