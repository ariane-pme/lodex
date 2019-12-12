import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(
    pureReducer,
    sagas,
    initialState,
    history,
) {
    const rootReducer = __DEBUG__
        ? (state, action) => {
              if (action.type == 'SET_STATE') {
                  return action.state || pureReducer({}, action);
              }
              return pureReducer(state, action);
          }
        : pureReducer;

    const reducer = compose(
        mergePersistedState(),
        connectRouter(history),
    )(rootReducer);

    const storage = compose(filter('user'))(adapter(window.sessionStorage));

    const middlewares = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    );

    const devtools =
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f;

    const persistStateEnhancer = persistState(storage);

    const store = createStore(
        reducer,
        initialState,
        compose(middlewares, persistStateEnhancer, devtools),
    );

    sagaMiddleware.run(sagas);
    if (__DEBUG__) {
        window.store = store;
    }

    return store;
}
