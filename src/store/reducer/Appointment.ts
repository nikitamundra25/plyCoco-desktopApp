import { handleActions } from 'redux-actions';
import { AppointmentActionTypes } from '../actions';
import { AppointmentInitialStates } from '../states';

export const appointmentReducer = handleActions<any, any>(
  {
    [AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_REQUEST]: (
      state: any,
      action: any,
    ) => ({
      ...state,
      isLoading: true,
    }),
    [AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_SUCCESS]: (
      state: any,
      action: any,
    ) => ({
      ...state,
      caregiverList: action.payload,
      isLoading: false,
    }),
    [AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_FAILED]: (
      state: any,
      action: any,
    ) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  AppointmentInitialStates,
);
