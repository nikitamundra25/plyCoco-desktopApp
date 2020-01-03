import React, { Suspense, Component } from 'react';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer, Slide } from 'react-toastify';
import { AppRoutes } from './config';
import { client } from './config';
import configureStore from './store';
import FullPageLoader from './containers/Loader/FullPageLoader';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

// import AppRouter from './routes';
import { Login } from './pages';

const AppRoutesComponent = React.lazy(() => import('./routes'));
const DefaultLayout = React.lazy(() =>
  import('./containers/DefaultLayout/DefaultLayout'),
);

// Create browser history
const history = createBrowserHistory();
// Configure store
const store: Store = configureStore(history);
let language: any;

class App extends Component<any, any> {
  componentDidMount() {
    console.log('inside cdu');
    language = localStorage.setItem('language', 'de');
    console.log('language', language);
  }
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Router history={history}>
              <Suspense fallback={<FullPageLoader />}>
                {/* sss
                <Login /> */}
                <Switch>
                  <Route
                    exact
                    path={AppRoutes.LOGIN}
                    render={props => <Login />}
                  />
                  <Route
                    path={AppRoutes.MAIN}
                    render={props => <DefaultLayout />}
                  />
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
        </ApolloProvider>
      </>
    );
  }
}

export default App;
