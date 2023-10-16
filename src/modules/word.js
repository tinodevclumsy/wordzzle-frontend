import { createAction, handleAction } from 'redux-actions';

const SAMPLE_ACTION = 'word/SAMPLE_ACTION';

export const sampleAction = createAction(SAMPLE_ACTION);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const word = handleAction(
  {
    [SAMPLE_ACTION]: (state) => state,
  },
  initialState
);

export default word;