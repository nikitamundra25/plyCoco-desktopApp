import React, { Suspense, useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import { AppRoutes } from '../../../../config';
import routes from '../../../../routes/routes';
import navigation from '../../../../_nav';
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { useLazyQuery } from '@apollo/react-hooks';
import Loader from '../Loader/Loader';
import { ProfileQueries } from '../../../../graphql/queries';
import logo from '../../../assets/img/plycoco-white.png';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
import { errorFormatter } from '../../../../helpers/ErrorFormatter';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const CareInstitutionTodoLayoutComponent = React.lazy(() =>
  import(
    '../../pages/CareInstitutionTodo/Sidebar/SidebarLayout/CareInstitutionTodoLayout'
  ),
);
const CareGiverTodoLayoutComponent = React.lazy(() =>
  import('../../pages/CareGiverTodo/Sidebar/SidebarLayout/CareGiverTodoLayout'),
);

//Caregiver Todo Layout
const CareGiverTodoLayout = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className='common-detail-page'>
          <div className='common-detail-section'>
            <div className='sticky-common-header'>
              <CareGiverTodoLayoutComponent />
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
              <CareInstitutionTodoLayoutComponent />
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

const DefaultLayout = (props: RouteComponentProps) => {
  let history = useHistory();
  let { pathname } = useLocation();
  let location = useLocation();

  const [viewAdminProfile, { data }] = useLazyQuery(VIEW_PROFILE, {
    fetchPolicy: 'no-cache',
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
      localStorage.removeItem('adminToken');
      history.push(AppRoutes.LOGIN);
    },
  });

  const [permission, setpermission] = useState<string>('');
  useEffect(() => {
    if (data) {
      const { viewAdminProfile } = data;
      setpermission(viewAdminProfile.accessLevel);
      console.log('viewAdminProfile.accessLevel', viewAdminProfile.accessLevel);

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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Token verification on route change
  useEffect(() => {
    try {
      viewAdminProfile();
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
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
      items: [],
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
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={<Loader />}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
};

export default DefaultLayout;
