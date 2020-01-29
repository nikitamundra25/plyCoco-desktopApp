import React, { Suspense, useEffect } from 'react';
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
import { ProfileQueries } from '../../../../queries';
import logo from '../../../assets/img/plycoco-white.png';

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
              <CareGiverTodoLayoutComponent {...props} />
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
              <CareInstitutionTodoLayoutComponent {...props} />
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

const DefaultLayout = (props: RouteComponentProps) => {
  let history = useHistory();
  let { pathname } = useLocation();
  const [viewAdminProfile, { data }] = useLazyQuery(VIEW_PROFILE, {
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    try {
      viewAdminProfile();
    } catch (error) {
      history.push(AppRoutes.LOGIN);
    }
  }, [pathname]);
  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const header: HTMLElement | null = document.getElementById('sidebar');
    if (header) {
      if (scrollPositionY >= 18) {
        header.classList.add('sidebar-sticky');
      } else {
        header.classList.remove('sidebar-sticky');
      }
    }
  };
  return (
    <div className='app'>
      <AppHeader>
        <Suspense fallback={<Loader />}>
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
            <AppSidebarNav navConfig={navigation} {...props} isOpen />
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
