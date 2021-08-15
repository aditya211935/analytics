import { storeObjectInUrl } from "common/utils";
import {
  SET_DATE_RANGE,
  RESET_DATE_RANGE,
  SET_TABLE_POSITION_PROPS,
} from "./action-types";
import { URL_KEYS } from "./constants";

const saveAnalyticsStateInUrl = () => async (dispatch, getState) => {
  const state = await getState();
  const { analytics } = state;
  var stateToStoreInUrl = {};
  Object.values(URL_KEYS).forEach(key => {
    stateToStoreInUrl[key] = analytics[key];
  });
  storeObjectInUrl(stateToStoreInUrl);
};

const setDateRange =
  ({ fromDate, toDate }) =>
  async dispatch => {
    dispatch({ type: SET_DATE_RANGE, payload: { fromDate, toDate } });
    dispatch(saveAnalyticsStateInUrl());
  };

const resetDateRange = () => async dispatch => {
  dispatch({ type: RESET_DATE_RANGE });
  dispatch(saveAnalyticsStateInUrl());
};

const setTablePositionProps = newTablePositionProps => async dispatch => {
  dispatch({
    type: SET_TABLE_POSITION_PROPS,
    payload: newTablePositionProps,
  });
  dispatch(saveAnalyticsStateInUrl());
};

export { setDateRange, resetDateRange, setTablePositionProps };
