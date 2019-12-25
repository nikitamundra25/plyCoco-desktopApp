// import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.scss';
// import { AppRoutes } from '../config';

// // Layout
// const DefaultLayout = React.lazy(() =>
//   import('../containers/DefaultLayout/DefaultLayout'),
// );

// // Pages
// const Login = React.lazy(() => import('../Pages/Login'));
// // const Page404 = React.lazy(() => import('./views/Pages/Page404/Page404'));

// const AppRouter = () => {
//   return (
//     <>fgfgf</>
//     // <Switch>
//     //   <Route exact path={AppRoutes.LOGIN} render={props => <Login />} />
//     //   {/* <Route
//     //       exact
//     //       path={AppRoutes.PAGE_NOTFOUND}
//     //       render={props => <NotFound />}
//     //     /> */}
//     //   {/* <Route path={AppRoutes.MAIN} render={props => <DefaultLayout />} /> */}
//     // </Switch>
//   );
// };

// export default AppRouter;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { AppRoutes } from '../config';

const DefaultLayout = React.lazy(() =>
  import('../containers/DefaultLayout/DefaultLayout'),
);
const Login = React.lazy(() => import('../Pages/Login'));

class AppRoutesComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path={AppRoutes.LOGIN}
          render={props => <Login {...props} {...this.props} />}
        />
        {/* <Route
            path={AppRoutes.MAIN}
            render={props => <DefaultLayout {...props} {...this.props} />}
          /> */}
      </Switch>
    );
  }
}

/**
 *
 */
export default AppRoutesComponent;
