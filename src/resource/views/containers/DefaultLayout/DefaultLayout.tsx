import React, { Suspense, useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  useHistory,
  useLocation
} from 'react-router-dom';
import { Container } from 'reactstrap';
import moment from 'moment';
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { AppRoutes } from '../../../../config';
import routes from '../../../../routes/routes';
import navigation from '../../../../_nav';
import Loader from '../Loader/Loader';
import { ProfileQueries } from '../../../../graphql/queries';
import { errorFormatter } from '../../../../helpers';
import logo from '../../../assets/img/plycoco-white.png';
import { REFRESH_TOKEN } from '../../../../graphql/Mutations';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
//Caregiver Todo Layout
const CareGiverTodoLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className='common-detail-page'>
          <div className='common-detail-section'>
            <div className='sticky-common-header'>
              {/* <CareGiverTodoLayoutComponent /> */}
            </div>
            <div className='common-content flex-grow-1'>
              <Component {...props} />
            </div>
          </div>
        </div>
      )}
    />
  );
};
const CareInstitutionTodoLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className='common-detail-page'>
          <div className='common-detail-section'>
            <div className='sticky-common-header'>
              {/* <CareInstitutionTodoLayoutComponent /> */}
            </div>
            <div className='common-content flex-grow-1'>
              <Component {...props} />
            </div>
          </div>
        </div>
      )}
    />
  );
};

const [VIEW_PROFILE] = ProfileQueries;

let toastId: any = null;
let timeInterval: any = null;

const DefaultLayout = (props: RouteComponentProps) => {
  let history = useHistory();
  let { pathname } = useLocation();

  const [viewAdminProfile, { data, loading, called }] = useLazyQuery(
    VIEW_PROFILE,
    {
      fetchPolicy: 'no-cache',
      onError: (error: ApolloError) => {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
        localStorage.removeItem('adminToken');
        localStorage.removeItem('expirationTime');
        history.push(AppRoutes.LOGIN);
      }
    }
  );

  const [refreshToken] = useMutation(REFRESH_TOKEN, {
    onCompleted({ refreshToken }) {
      if (refreshToken) {
        const { sessionExpire, token } = refreshToken;
        let expirationTime: number = moment().unix() + sessionExpire;
        localStorage.setItem('adminToken', token);
        localStorage.setItem('expirationTime', expirationTime.toString());
      }
    },
    onError() {
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('adminToken');
      history.push(AppRoutes.LOGIN);
    },
  });

  const [permission, setpermission] = useState<string>('');
  useEffect(() => {
    if (data) {
      const { viewAdminProfile } = data;
      setpermission(viewAdminProfile.accessLevel);
      if (
        viewAdminProfile.accessLevel !== 'superadmin' &&
        (pathname === AppRoutes.EMPLOYEE ||
          pathname === AppRoutes.ADD_EMPLOYEE ||
          pathname === AppRoutes.EDIT_EMPLOYEE ||
          pathname === AppRoutes.VIEW_EMPLOYEE)
      ) {
        history.push(AppRoutes.HOME);
      }
    }
  }, [data]);

  // To add scroll event listener
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      history.push(AppRoutes.LOGIN);
    } else {
      timeInterval = setInterval(() => {
        let expirationTime: string | null = localStorage.getItem(
          'expirationTime'
        );
        var currentTime: number = moment().unix();
        if (expirationTime && parseInt(expirationTime) - currentTime === 10) {
          refreshToken();
        }
      }, 1000);
      viewAdminProfile();
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Token verification on route change
  useEffect(() => {
    try {
      if (localStorage.getItem('adminToken')) {
        viewAdminProfile();
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
      history.push(AppRoutes.LOGIN);
    }
  }, [pathname]);
  // To add sticky class into header
  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const header: HTMLElement | null = document.getElementById('sidebar');
    if (header) {
      if (scrollPositionY >= 12) {
        header.classList.add('sidebar-sticky');
      } else {
        header.classList.remove('sidebar-sticky');
      }
    }
  };

  const navigationFunction = (permissions: any) => {
    const navItems: any = {
      items: []
    };
    navigation.items.forEach((nav: any | string) => {
      if (nav) {
        nav.authKey.map((data: string, index: number) => {
          if (data === permissions) {
            navItems.items.push(nav);
          }
        });
      }
    });
    return navItems;
  };

  return (
    <div className='app'>
      <AppHeader>
        <Suspense fallback={''}>
          <DefaultHeader />
        </Suspense>
      </AppHeader>
      <div className='app-body'>
        <AppSidebar fixed minimized display='lg' id='sidebar'>
          <div className='sidebar-logo'>
            <img src={logo} alt='' className='img-fluid' />
          </div>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense fallback={<Loader />}>
            <AppSidebarNav
              navConfig={navigationFunction(permission || {})}
              {...props}
              isOpen
            />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className='main'>
          {/* {!called || loading ? (
            <div className={'detailview-loader'}>
              <Loader />
            </div>
          ) : ( */}
          <Container fluid>
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route: any, idx) => {
                  return route.layout ? (
                    route.layoutName === 'CareInstitutionTodoLayout' ? (
                      <CareInstitutionTodoLayout
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ) : route.layoutName === 'CareGiverTodoLayout' ? (
                      <CareGiverTodoLayout
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ) : null
                  ) : route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ) : null;
                })}
                <Redirect from={AppRoutes.MAIN} to={AppRoutes.HOME} />
              </Switch>
            </Suspense>
          </Container>
          {/* )} */}
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={''}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
};

export default DefaultLayout;
