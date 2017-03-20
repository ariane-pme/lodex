import { combineActions, createAction, handleActions } from 'redux-actions';

import {
    CHANGE as REDUX_FORM_CHANGE,
    ARRAY_INSERT as REDUX_FORM_ARRAY_INSERT,
    ARRAY_REMOVE as REDUX_FORM_ARRAY_REMOVE,
} from 'redux-form/lib/actionTypes';

import { SAVE_FIELD_SUCCESS, SAVE_FIELD_ERROR } from '../fields';

export const PUBLISH = 'PUBLISH';
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
export const PUBLISH_ERROR = 'PUBLISH_ERROR';

export const publish = createAction(PUBLISH);
export const publishSuccess = createAction(PUBLISH_SUCCESS);
export const publishError = createAction(PUBLISH_ERROR);

export const defaultState = {
    error: null,
    loading: false,
};

export default handleActions({
    PUBLISH: state => ({
        ...state,
        error: null,
        loading: true,
    }),
    PUBLISH_SUCCESS: state => ({
        ...state,
        error: null,
        loading: false,
    }),
    PUBLISH_ERROR: (state, { payload: error }) => ({
        ...state,
        error: error.message || error,
        loading: false,
    }),
    [combineActions(
        REDUX_FORM_CHANGE,
        REDUX_FORM_ARRAY_INSERT,
        REDUX_FORM_ARRAY_REMOVE,
    )]: (state, { meta: { form } }) => (
        form === 'field'
        ? ({
            ...state,
            loading: true,
        })
        : state
    ),
    [combineActions(SAVE_FIELD_ERROR, SAVE_FIELD_SUCCESS)]: state => ({
        ...state,
        loading: false,
    }),
}, defaultState);

export const getIsPublishing = state => state.loading;
export const getPublishingError = state => state.error;

export const selectors = {
    getIsPublishing,
    getPublishingError,
};
