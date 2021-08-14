import { storeObjectInUrl, getObjectFromUrl } from "common/utils";
import { SET_DATE_RANGE, RESET_DATE_RANGE } from "./action-types";
import { URL_KEYS } from "./constants";

const saveAnalyticsStateInUrl = () => async (dispatch, getState) => {
  const state = await getState();
  const { analytics } = state;
  var stateToStoreInUrl = {};
  Object.values(URL_KEYS).forEach((key) => {
    stateToStoreInUrl[key] = analytics[key];
  });
  storeObjectInUrl(stateToStoreInUrl);
};

const setDateRange =
  ({ fromDate, toDate }) =>
  async (dispatch) => {
    dispatch({ type: SET_DATE_RANGE, payload: { fromDate, toDate } });
    dispatch(saveAnalyticsStateInUrl());
  };

const resetDateRange = () => async (dispatch) => {
  dispatch({ type: RESET_DATE_RANGE });
  dispatch(saveAnalyticsStateInUrl());
};

export { setDateRange, resetDateRange };
