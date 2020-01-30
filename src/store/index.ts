import { Store, createStore, applyMiddleware, Action, Middleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import { IRootState } from '../interfaces';
import logger from 'redux-logger';
import RootReducer from './reducer';
import { createLogicMiddleware } from 'redux-logic';
import { AllLogics } from './logic';

export default function configureStore(
  history: History,
  initialState?: IRootState,
): Store<IRootState> {
  const logicMiddleware: Middleware = createLogicMiddleware(AllLogics);
  const middlewares: Middleware[] = [
    routerMiddleware(history),
    logicMiddleware,
  ];
  const isProd: boolean = process.env.NODE_ENV === 'production';
  if (!isProd) {
    middlewares.push(logger);
  }

  const middleware: any = applyMiddleware(...middlewares);

  const store: Store<any, Action> = createStore(
    RootReducer as any,
    initialState as any,
    middleware,
  ) as Store<IRootState>;

  return store;
}
