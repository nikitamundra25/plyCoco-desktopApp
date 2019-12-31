import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { AppRoutes } from './config';
import { createBrowserHistory } from 'history';
// import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer, Slide } from 'react-toastify';
// import { client } from './config';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import FullPageLoader from './containers/Loader/FullPageLoader';
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import AppReducer from "./reducer";
// import { mode, EnviornmentTypes } from "./config/AppConfig";
import { createLogicMiddleware } from "redux-logic";
import arrLogic from "./logic";
import logger from "redux-logger";

// import AppRouter from './routes';
import { Login } from './pages';

const AppRoutesComponent = React.lazy(() => import('./routes'));
const DefaultLayout = React.lazy(() =>
  import('./containers/DefaultLayout/DefaultLayout'),
);

const history = createBrowserHistory();

const logicMiddleware = createLogicMiddleware(arrLogic);
const middlewares = [logicMiddleware, routerMiddleware(history)];
middlewares.push(logger);

export const store = createStore(AppReducer, applyMiddleware(...middlewares));

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={<FullPageLoader />}>
            {/* sss
          <Login /> */}
            <Switch>
              <Route exact path={AppRoutes.LOGIN} render={props => <Login />} />
              <Route path={AppRoutes.MAIN} render={props => <DefaultLayout />} />
            </Switch>
            {/* <AppRoutesComponent /> */}
          </Suspense>
        </Router>
        <ToastContainer
          autoClose={8000}
          hideProgressBar
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          transition={Slide}
        />
      </Provider>
    </>
  );
};

export default App;
