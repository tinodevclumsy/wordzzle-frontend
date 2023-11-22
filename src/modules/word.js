import { createAction, handleActions } from 'redux-actions';
import * as wordAPI from '../lib/api/word';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { produce } from 'immer';

const [WORD_LIST, WORD_LIST_SUCCESS, WORD_LIST_FAILURE] =
  createRequestActionTypes('word/WORD_LIST');
const CHANGE_PAGINATION = 'word/CHANGE_PAGINATION';
const SEARCH_KEYWORD = 'word/SEARCH_KEYWORD';
const UPDATE_MODAL = 'word/UPDATE_MODAL';
const CHANGE_TITLE = 'word/CHANGE_TITLE';
const ADD_MEANING = 'word/ADD_MEANING';
const DELETE_MEANING = 'word/DELETE_MEANING';
const CHANGE_MEANING = 'word/CHANGE_MEANING';

const [DELETE_WORD, DELETE_WORD_SUCCESS, DELETE_WORD_FAILURE] =
  createRequestActionTypes('word/DELETE_WORD');

const [UPDATE_WORD, UPDATE_WORD_SUCCESS, UPDATE_WORD_FAILURE] =
  createRequestActionTypes('word/UPDATE_WORD');

export const changePagination = createAction(CHANGE_PAGINATION, ({ page }) => ({
  page,
}));

export const changeTitle = createAction(CHANGE_TITLE, ({ value }) => value);

export const changeMeaning = createAction(
  CHANGE_MEANING,
  ({ index, value }) => ({ index, value }),
);

export const addMeaning = createAction(ADD_MEANING);

export const deleteMeaning = createAction(DELETE_MEANING, ({ index }) => index);

export const searchKeyword = createAction(SEARCH_KEYWORD, ({ keyword }) => ({
  keyword,
}));

export const updateModal = createAction(UPDATE_MODAL, ({ modal, item }) => ({
  modal,
  item,
}));

export const wordList = createAction(
  WORD_LIST,
  ({ page = 1, keyword = '' }) => ({
    page,
    keyword,
  }),
);

export const deleteWord = createAction(DELETE_WORD, ({ id }) => ({
  id,
}));

export const updateWord = createAction(
  UPDATE_WORD,
  ({ id, title, status, meaning }) => ({
    id,
    title,
    status,
    meaning,
  }),
);

const wordListSaga = createRequestSaga(WORD_LIST, wordAPI.getWordList);
const wordDeleteSaga = createRequestSaga(DELETE_WORD, wordAPI.deleteWord);
const wordUpdateSaga = createRequestSaga(UPDATE_WORD, wordAPI.updateWord);

export function* wordSaga() {
  yield takeLatest(WORD_LIST, wordListSaga);
  yield takeLatest(DELETE_WORD, wordDeleteSaga);
  yield takeLatest(UPDATE_WORD, wordUpdateSaga);
}

const initialState = {
  list: {},
  quiz: [],
  options: {
    page: 1,
    keyword: '',
    edit: {
      status: false,
      item: {},
    },
    delete: {
      status: false,
      item: {},
    },
  },
  error: null,
};

const word = handleActions(
  {
    [WORD_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      list: data,
    }),
    [WORD_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [DELETE_WORD_SUCCESS]: (state) =>
      produce(state, (draft) => {
        const index = draft.list.words.findIndex(
          (ele) => ele._id === draft.options.delete.item._id,
        );
        if (index > -1) {
          draft.list.words.splice(index);
          draft.options.delete.item = {};
        }
        draft.options.delete.status = false;
      }),
    [DELETE_WORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_WORD_SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        const index = draft.list.words.findIndex(
          (ele) => ele._id === payload._id,
        );

        if (index > -1) {
          draft.list.words[index] = payload;
          draft.options.edit.item = {};
        }

        draft.options.edit.status = false;
      }),
    [UPDATE_WORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_PAGINATION]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.options.page = payload.page;
      }),
    [SEARCH_KEYWORD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.options.keyword = payload.keyword;
      }),
    [UPDATE_MODAL]: (state, { payload: { modal, item } }) =>
      produce(state, (draft) => {
        draft.options[modal].status = !state.options[modal].status;
        draft.options[modal].item = item;
      }),
    [CHANGE_TITLE]: (state, { payload: value }) =>
      produce(state, (draft) => {
        draft.options.edit.item.title = value;
      }),
    [CHANGE_MEANING]: (state, { payload: { index, value } }) =>
      produce(state, (draft) => {
        draft.options.edit.item.meaning[index].value = value;
      }),
    [ADD_MEANING]: (state) =>
      produce(state, (draft) => {
        draft.options.edit.item.meaning.push({ value: '' });
      }),
    [DELETE_MEANING]: (state, { payload: index }) =>
      produce(state, (draft) => {
        draft.options.edit.item.meaning.splice(index);
      }),
  },
  initialState,
);

export default word;
