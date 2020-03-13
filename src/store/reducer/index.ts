import { combineReducers, AnyAction, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { languageReducer } from './Language';
import { appointmentReducer } from './Appointment';
import { IRootState } from '../../interfaces';

/**
  Here we will combine all reducer into one.
**/
const RootReducer: Reducer<IRootState, AnyAction> = combineReducers<IRootState>(
  {
    languageReducer: languageReducer as any,
    appointmentReducer: appointmentReducer as any,
    routing: routerReducer as any,
  },
);

export default RootReducer;
