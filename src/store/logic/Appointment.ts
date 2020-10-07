import { createLogic } from 'redux-logic';
import { AppointmentActionTypes, addAvailabilitySuccess } from '../actions';

const addAvailability = createLogic({
  type: AppointmentActionTypes.ADD_CAREGIVER_AVAILABILITY_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;

    // dispatch(showLoader());
    dispatch(addAvailabilitySuccess(action.payload));
  },
});

export const AppointmentLogics = [addAvailability];
