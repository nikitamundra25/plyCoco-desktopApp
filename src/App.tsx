import React, { Suspense, Component } from 'react';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer, Slide } from 'react-toastify';
import { AppRoutes, SortOptions, Gender } from './config';
import { client } from './config';
import configureStore from './store';
import FullPageLoader from './resource/views/containers/Loader/FullPageLoader';
import { Login } from './resource/views/pages';
import * as l from './resource/language/en.json';
import './properties/String';
import './properties/Array';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const DefaultLayout = React.lazy(() =>
  import('./resource/views/containers/DefaultLayout/DefaultLayout'),
);

const ValidateAzureLogin = React.lazy(() =>
  import("./resource/views/pages/Login/ValidateAzureLogin")
);
// Create browser history
const history = createBrowserHistory({ basename: '/superadmin' });
// Configure store
const store: Store = configureStore(history);

class App extends Component<any, any> {
  // componentDidMount() {
  //   localStorage.setItem('language', 'en');
  // }
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
                    exact
                    path={AppRoutes.VALIDATE_AZURE_LOGIN}
                    render={props => <ValidateAzureLogin />}
                  />
                  <Route
                    path={AppRoutes.MAIN}
                    render={props => <DefaultLayout {...props} />}
                  />
                </Switch>
                {/* <AppRoutesComponent /> */}
              </Suspense>
            </Router>
            <ToastContainer
              autoClose={8000}
              hideProgressBar
              draggable={false}
              pauseOnFocusLoss={false}
              pauseOnHover={false}
              transition={Slide}
              newestOnTop
              className='custom-toaster'
            />
          </Provider>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
