import { createAction } from "redux-actions";

export const LanguageAction = {
    STORE_CURRENT_LANGUAGE_REQUEST: "Store language Data",
};

export const storeCurrLangRequest = createAction(LanguageAction.STORE_CURRENT_LANGUAGE_REQUEST);
