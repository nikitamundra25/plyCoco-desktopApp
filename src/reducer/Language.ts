import { handleActions } from 'redux-actions';
import { LanguageAction } from '../actions';

const initialState = {
  language: {},
};

export const languageReducer = handleActions(
  {
    [LanguageAction.STORE_CURRENT_LANGUAGE_REQUEST]: (state, { payload }) => ({
      ...state,
      language: payload,
    }),
  },
  initialState,
);
