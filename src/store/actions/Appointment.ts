import { createAction } from 'redux-actions';

export enum AppointmentActionTypes {
  ADD_CAREGIVER_AVAILABILITY_REQUEST = 'Caregiver availability add Requested!',
  ADD_CAREGIVER_AVAILABILITY_SUCCESS = 'Caregiver availability fetched successfully!',
  ADD_CAREGIVER_AVAILABILITY_FAILED = 'Caregiver availability list failed to fetch!',
}
export const addAvailabilityRequest = createAction(
  AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_REQUEST,
);
export const addAvailabilitySuccess = createAction(
  AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_SUCCESS,
);
export const addAvailabilityFailed = createAction(
  AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_FAILED,
);
