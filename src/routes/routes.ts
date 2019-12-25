import React from 'react';
import { AppRoutes } from '../config';

const Home = React.lazy(() => import('../app/containers/Home'));
const Login = React.lazy(() => import('../app/containers/Auth'));
const MyProfile = React.lazy(() => import('../app/containers/MyProfile'));

// Course Route
const Course = React.lazy(() => import('../app/containers/Course'));
const AddCourse = React.lazy(() => import('./../app/containers/Course/AddCourse'));
const CourseDetails = React.lazy(() => import('./../app/containers/Course/ViewCourse'));

// Module Route
const Modules = React.lazy(() => import('../app/containers/Modules'));
const AddModule = React.lazy(() => import('../app/containers/Modules/AddModule'));
const ViewModule = React.lazy(() => import('../app/containers/Modules/ViewModule'));

// Organization Route
const Organization = React.lazy(() => import('../app/containers/Organization'));
const AddOrganization = React.lazy(() => import('../app/containers/Organization/AddOrganization'));
const ViewOrganization = React.lazy(() => import('../app/containers/Organization/ViewOrganization'));

// Lesson Route
const AddLesson = React.lazy(() => import('../app/containers/Lesson/AddLesson'));
const Lesson = React.lazy(() => import('../app/containers/Lesson'));
const ViewLesson = React.lazy(() => import('../app/containers/Lesson/ViewLesson'));

// Question Module
const AddQuestion = React.lazy(() => import('../app/containers/Question/AddQuestion'));
const Question = React.lazy(() => import('../app/containers/Question'));
const ViewQuestion = React.lazy(() => import('../app/containers/Question/QuestionDetails'));

// Quiz Module
const Quiz = React.lazy(() => import('../app/containers/Quiz'));
const AddQuiz = React.lazy(() => import('../app/containers/Quiz/AddQuiz'))
const QuizDetails = React.lazy(() => import('../app/containers/Quiz/ViewQuiz'))

// Student Module
const Student = React.lazy(() => import('../app/containers/Student'));
const StudentDetails = React.lazy(() => import('../app/containers/Student/StudentDetails'));

// CMS home Page 
const HomePage = React.lazy(() => import('../app/containers/HomePage/AddHomePage'));

// CMS Page
const CMSPage = React.lazy(() => import('../app/containers/CMS'));
const AddCMSPage = React.lazy(() => import('../app/containers/CMS/AddCMSPage'));
const CMSDetails = React.lazy(() => import('../app/containers/CMS/ViewCMSPage'));


//Settings
const Settings = React.lazy(() => import('../app/containers/Settings'));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: 'Home' },
  {
    path: AppRoutes.HOME,
    name: 'Dashboard',
    component: Home,
    exact: true,
  },
  {
    path: AppRoutes.LOGIN,
    name: '',
    component: Login,
    exact: true,
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: 'Profile',
    component: MyProfile,
    exact: true,
  },
  {
    path: AppRoutes.COURSE_LIST,
    name: 'Courses',
    component: Course,
    exact: true,
  },
  {
    path: AppRoutes.ADD_COURSE,
    name: 'Add Course',
    component: AddCourse,
    exact: true,
  },
  {
    path: AppRoutes.COURSE_INFO,
    name: 'Update Course',
    component: AddCourse,
    exact: true,
  },
  {
    path: AppRoutes.COURSE_DETAILS,
    name: 'Course Details',
    component: CourseDetails,
    exact: true,
  },
  {
    path: AppRoutes.ORGANIZATION,
    name: 'Organizations',
    component: Organization,
    exact: true,
  },
  {
    path: AppRoutes.ADD_ORGANIZATION,
    name: 'Add Organization',
    component: AddOrganization,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_ORGANIZATION,
    name: 'Update Organization',
    component: AddOrganization,
    exact: true,
  },
  {
    path: AppRoutes.VIEW_ORGANIZATION,
    name: 'Organization Details',
    component: ViewOrganization,
    exact: true,
  },
  {
    path: AppRoutes.MODULE,
    name: 'Modules',
    component: Modules,
    exact: true,
  },
  {
    path: AppRoutes.ADD_MODULE,
    name: 'Add Module',
    component: AddModule,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_MODULE,
    name: 'Update Module',
    component: AddModule,
    exact: true,
  },
  {
    path: AppRoutes.VIEW_MODULE,
    name: 'Module Details',
    component: ViewModule,
    exact: true,
  },
  {
    path: AppRoutes.LESSON,
    name: 'Lesson',
    component: Lesson,
    exact: true,
  },
  {
    path: AppRoutes.ADD_LESSON,
    name: 'Add Lesson',
    component: AddLesson,
    exact: true,
  },
  {
    path: AppRoutes.VIEW_LESSON,
    name: 'View Lesson',
    component: ViewLesson,
    exact: true,
  },
  {
    path: AppRoutes.EDIT_LESSON,
    name: 'Update Lesson',
    component: AddLesson,
    exact: true,
  },
  {
    path: AppRoutes.QUESTION,
    name: 'Questions',
    component: Question,
    exact: true
  },
  {
    path: AppRoutes.ADD_QUESTION,
    name: 'Add Question',
    component: AddQuestion,
    exact: true
  },
  {
    path: AppRoutes.EDIT_QUESTION,
    name: 'Update Question',
    component: AddQuestion,
    exact: true
  },
  {
    path: AppRoutes.VIEW_QUESTION,
    name: 'Question Details',
    component: ViewQuestion,
    exact: true
  },
  {
    path: AppRoutes.QUIZ,
    name: 'Quiz',
    component: Quiz,
    exact: true
  },
  {
    path: AppRoutes.ADD_QUIZ,
    name: 'Add Quiz',
    component: AddQuiz,
    exact: true
  },
  {
    path: AppRoutes.EDIT_QUIZ,
    name: 'Update Quiz',
    component: AddQuiz,
    exact: true
  },
  {
    path: AppRoutes.VIEW_QUIZ,
    name: 'Quiz Details',
    component: QuizDetails,
    exact: true
  },
  {
    path: AppRoutes.STUDENT,
    name: 'Student',
    component: Student,
    exact: true
  },
  {
    path: AppRoutes.VIEW_STUDENT,
    name: 'Student Details',
    component: StudentDetails,
    exact: true
  },
  {
    path: AppRoutes.ADD_HOME_PAGE,
    name: 'Home Page',
    component: HomePage,
    exact: true
  },
  {
    path: AppRoutes.CMSPAGE,
    name: 'CMS',
    component: CMSPage,
    exact: true
  },
  {
    path: AppRoutes.ADD_CMS_PAGE,
    name: 'Add Page',
    component: AddCMSPage,
    exact: true
  },
  {
    path: AppRoutes.EDIT_CMS_PAGE,
    name: 'Update Page',
    component: AddCMSPage,
    exact: true
  },
  {
    path: AppRoutes.VIEW_CMS_PAGE,
    name: 'Page Details',
    component: CMSDetails,
    exact: true
  },
  {
    path: AppRoutes.SETTINGS,
    name: 'Settings',
    component: Settings,
    exact: true
  },
];

export default routes;
