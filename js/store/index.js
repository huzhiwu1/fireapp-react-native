import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
// export default createStore(
// rootReducer,
// /* preloadedState, */ composeEnhancers(
// applyMiddleware(thunk)
// other store enhancers if any
// )
// );

// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
// const enhancer = composeWithDevTools({})(applyMiddleware(thunk));
// export default createStore(rootReducer, enhancer);
// import { composeWithDevTools } from 'remote-redux-devtools';

// export default createStore(
//   rootReducer,
//   /* preloadedState, */ composeWithDevTools(
//     applyMiddleware(thunk)
//     // other store enhancers if any
//   )
// );
