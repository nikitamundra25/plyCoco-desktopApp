import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { AppRoutes } from './config';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer, Slide } from 'react-toastify';
import { client } from './config';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import FullPageLoader from './containers/Loader/FullPageLoader';
// import AppRouter from './routes';
import { Login } from './Pages';

const AppRoutesComponent = React.lazy(() => import('./routes'));
const DefaultLayout = React.lazy(() =>
  import('./containers/DefaultLayout/DefaultLayout'),
);

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <>
      {/* <ApolloProvider client={client}> */}
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
      {/* </ApolloProvider> */}
    </>
  );
};

export default App;
