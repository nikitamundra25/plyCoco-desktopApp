import { createLogic } from "redux-logic";
import { push } from "react-router-redux";
export const redirectToLogic = createLogic({
  type: 'REDIRET_TO',
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    dispatch(push(action.payload.path));
    done();
  },
});

export default [
  redirectToLogic
];
