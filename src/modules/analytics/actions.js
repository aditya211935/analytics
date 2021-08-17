import { nanoid } from "nanoid";

import { storeObjectInUrl } from "common/utils/helpers";
import request from "common/utils/request";

import {
  SET_DATE_RANGE,
  RESET_DATE_RANGE,
  SET_TABLE_POSITION_PROPS,
  SET_TABLE_FILTERS,
  SET_LOADING_REPORTS,
  SET_REPORTS,
  SET_ALL_APPS,
} from "./action-types";
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

const setTablePositionProps = (newTablePositionProps) => async (dispatch) => {
  dispatch({
    type: SET_TABLE_POSITION_PROPS,
    payload: newTablePositionProps,
  });
  dispatch(saveAnalyticsStateInUrl());
};

const setTableFilters = (newTableFilters) => async (dispatch) => {
  dispatch({ type: SET_TABLE_FILTERS, payload: newTableFilters });
  dispatch(saveAnalyticsStateInUrl());
};

const fetchReports =
  ({ fromDate, toDate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_REPORTS, payload: true });

      var response = await request(`report?startDate=${fromDate}&endDate=${toDate}`);
      if (!response.ok) throw new Error("Error occured: Status", response.status);
      var parsedJson = await response.json();

      /**
       * using nanoid for generating a unique id for each report.
       * Ideally, backend should send a unique id as per db table's
       * row. We need this id for setting key in <tr>.
       * Array index cannot be used to set key as data can be fetched
       * again if the dates change.
       */
      dispatch({
        type: SET_REPORTS,
        payload: parsedJson.data.map((item) => ({ id: nanoid(), ...item })),
      });
      dispatch({ type: SET_LOADING_REPORTS, payload: false });
    } catch (err) {
      dispatch({ type: SET_LOADING_REPORTS, payload: false });
      console.error("Couldn't fetch reports: ", err);
    }
  };

const fetchAllApps = () => async (dispatch) => {
  try {
    var response = await request("apps");
    if (!response.ok) throw new Error("Error occured: Status", response.status);
    var parsedJson = await response.json();

    dispatch({ type: SET_ALL_APPS, payload: parsedJson.data });
  } catch (err) {
    console.error("Couldn't fetch apps: ", err);
  }
};

export {
  setDateRange,
  resetDateRange,
  setTablePositionProps,
  setTableFilters,
  fetchReports,
  fetchAllApps,
};
