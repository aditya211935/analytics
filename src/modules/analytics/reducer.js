import { getObjectFromUrl } from "common/utils/helpers";
import {
  RESET_DATE_RANGE,
  SET_DATE_RANGE,
  SET_TABLE_FILTERS,
  SET_TABLE_POSITION_PROPS,
  SET_ALL_APPS,
  SET_REPORTS,
  SET_LOADING_REPORTS,
} from "./action-types";
import { URL_KEYS, TABLE_KEYS } from "./constants";

var initialState = {
  dateRange: { fromDate: "2021-06-01", toDate: "2021-06-30" },
  tablePositionProps: Object.values(TABLE_KEYS).map((key) => ({
    key,
    visible: true,
  })),
  tableFilters: {},
  reportsList: [],
  allAppsList: [],
  loadingReports: false,
};

var initialStateFromUrl = getObjectFromUrl() || {};
// Need to apply some validation here otherwise the user
// can enter anything in the url's key, and it'll
// change the initialState if JSON.parse is successful
Object.values(URL_KEYS).forEach((key) => {
  if (!(key in initialStateFromUrl)) return;
  initialState[key] = initialStateFromUrl[key];
});

function analyticsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATE_RANGE:
      return {
        ...state,
        dateRange: {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
        },
      };
    case RESET_DATE_RANGE:
      return {
        ...state,
        dateRange: {
          fromDate: initialState.dateRange.fromDate,
          toDate: initialState.dateRange.toDate,
        },
      };
    case SET_TABLE_POSITION_PROPS:
      return { ...state, tablePositionProps: action.payload };
    case SET_TABLE_FILTERS:
      return { ...state, tableFilters: action.payload };
    case SET_ALL_APPS:
      return { ...state, allAppsList: action.payload };
    case SET_REPORTS:
      return { ...state, reportsList: action.payload };
    case SET_LOADING_REPORTS:
      return { ...state, loadingReports: action.payload };
    default:
      return state;
  }
}

export { analyticsReducer };
