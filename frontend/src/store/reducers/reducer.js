import * as actionTypes from "../actions/action";

const initialState = {
  eventDetails: {},
  openDetails: false,
  scrollY: 0,
  loading: false,
  userRole: "user",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_EVENTS:
      return {
        ...state,
        eventDetails: {
          ...action.eventData,
          location: {
            ...action.eventData.location,
          },
        },
      };

    case actionTypes.OPEN_DETAILS:
      return {
        ...state,
        openDetails: !state.openDetails,
      };

    case actionTypes.STORE_SCROLL_POSITION:
      return {
        ...state,
        scrollY: action.val,
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.val,
      };

    case actionTypes.SET_USER_ROLE:
      return {
        ...state,
        userRole: action.val,
      };

    default:
      return state;
  }
};

export default reducer;
