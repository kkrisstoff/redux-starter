import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import reducer from '../reducers/index.js';
import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  ),
  createStore
);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}