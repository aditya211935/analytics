import { getObjectFromUrl } from "common/utils";
import { RESET_DATE_RANGE, SET_DATE_RANGE } from "./action-types";
import { URL_KEYS } from "./constants";

var initialState = {
  dateRange: { fromDate: "2021-06-01", toDate: "2021-06-30" },
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
    default:
      return state;
  }
}

export { analyticsReducer };
