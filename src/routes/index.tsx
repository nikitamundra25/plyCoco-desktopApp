import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './config';
import FullPageLoader from './containers/Loader/FullPageLoader';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

// Layout
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('../views/'));
const Page404 = React.lazy(() => import('./views/Pages/Page404/Page404'));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<FullPageLoader />}>
        <Switch>
          <Route
            exact
            path={AppRoutes.LOGIN}
            name='Login Page'
            render={props => <Login {...props} />}
          />
          <Route
            exact
            path='/404'
            name='Page 404'
            render={props => <Page404 {...props} />}
          />
          <Route
            path={AppRoutes.MAIN}
            name='Home'
            render={props => <DefaultLayout {...props} />}
          />
        </Switch>
        <ToastContainer />
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
