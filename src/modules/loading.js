import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';
const NOTIFY = 'loading/NOTIFY';
import { produce } from 'immer';

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType,
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType,
);

export const notify = createAction(NOTIFY, ({ type, message }) => ({
  type,
  message,
}));
const initialState = {
  notify: {
    toggler: false,
    type: '',
    message: '',
  },
};

const loading = handleActions(
  {
    [START_LOADING]: (state) => state,
    [FINISH_LOADING]: (state) => state,
    [NOTIFY]: (state, { payload: { type, message } }) =>
      produce(state, (draft) => {
        draft.notify.toggler = !state.notify.toggler;
        draft.notify.type = type;
        draft.notify.message = message;
      }),
  },
  initialState,
);

export default loading;
